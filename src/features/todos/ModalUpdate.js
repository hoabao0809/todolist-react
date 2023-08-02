import { Checkbox, FilledInput, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useUpdateTodoMutation } from "./todosSlice";
import { LoadingButton } from "@mui/lab";
import { notifyFailure, notifySuccess } from "../../utils/notify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};
const initialTodo = {
  text: "",
  completed: false,
};

function ModalUpdate({ isOpen, onClose, todo: originalTodo }) {
  const [todo, setTodo] = useState(originalTodo ?? initialTodo);

  useEffect(() => {
    setTodo(originalTodo);
  }, [originalTodo]);

  const onInputChanged = (e) => setTodo({ ...todo, text: e.target.value });

  const onCheckboxChanged = (e) =>
    setTodo({ ...todo, completed: !todo.completed });

  const [updateTodo, { isLoading: isLoadingUpdate }] = useUpdateTodoMutation();

  const onUpdateTodoClicked = (e) => {
    const updatedTodo = { ...originalTodo, ...todo };
    const { created_at, color, ...restData } = updatedTodo;

    async function asyncUpdate(cb) {
      const result = await updateTodo(restData, {
        color: (color ?? null) && color.name.toLowerCase(),
      });

      if (result) return cb();
      notifyFailure("Update unsuccessfully");
    }

    asyncUpdate(() => {
      notifySuccess("Updated todo successfully");
      onClose();
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: "16px" }}>
          <Typography>Name:</Typography>
          <FilledInput
            autoFocus
            value={todo?.text}
            sx={{ width: "100%" }}
            onChange={(e) => onInputChanged(e)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "0.5rem",
          }}
        >
          <Typography>Status:</Typography>
          <Checkbox
            checked={todo?.completed}
            onChange={onCheckboxChanged}
          />
          <Typography>{todo?.completed ? "Completed" : "Active"}</Typography>
        </Box>

        <LoadingButton
          loading={isLoadingUpdate}
          variant="contained"
          loadingIndicator="UPDATING"
          sx={{
            marginTop: "1rem",
            display: "flex",
            marginLeft: "auto",
          }}
          onClick={onUpdateTodoClicked}
        >
          UPDATE
        </LoadingButton>
      </Box>
    </Modal>
  );
}

export default ModalUpdate;
