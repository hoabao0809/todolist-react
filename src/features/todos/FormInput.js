import React, { useRef, useState } from "react";
import { FilledInput, Box } from "@mui/material";
import { useAddTodoMutation } from "./todosSlice";
import { LoadingButton } from "@mui/lab";
import { notifyFailure, notifySuccess } from "../../utils/notify";

function FormInput() {
  const [input, setInput] = useState();
  const inputRef = useRef();

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleOnClick = () => {
    if (!input) return;

    async function asyncAdd(cb) {
      const result = await addTodo(input);

      if (result) return cb();
      notifyFailure("Add new to-do unsuccessfully");
    }

    asyncAdd(() => {
      notifySuccess("Todo added successfully!");

      // inputRef.current.value = ""; // avoid DOM manipulation
      setInput("");
      inputRef.current.focus();
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        gap: "1rem",
      }}
    >
      <FilledInput
        autoFocus
        value={input}
        inputRef={inputRef}
        placeholder="Enter a to-do"
        sx={{ width: "100%" }}
        onChange={(e) => handleOnChange(e)}
      />
      <LoadingButton
        loading={isLoading}
        variant="contained"
        onClick={handleOnClick}
      >
        ADD
      </LoadingButton>
    </Box>
  );
}

export default FormInput;
