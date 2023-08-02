import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { Checkbox } from "@mui/material";
import ModalUpdate from "./ModalUpdate";
import { useSelector } from "react-redux";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "./todosSlice";
import { LoadingButton } from "@mui/lab";
import { selectColors } from "../colors/colorsSlice";
import { COLORS_CODE } from "../../constants";
import swal from "sweetalert";
import { notifyFailure, notifySuccess } from "../../utils/notify";

function TodoItem({ todo: currentTodo, filterStatus }) {
  const colors = useSelector(selectColors);

  const id = currentTodo.id;

  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    currentTodo?.color?.name ?? ""
  );

  const [deleteToDo, { isLoading: isLoadingDelete }] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  useEffect(() => {
    setSelectedColor(currentTodo?.color?.name ?? "");
  }, [currentTodo]);

  const onCompleteTodoChanged = (e) => {
    const { created_at, color, ...rest } = currentTodo;

    const updatedTodo = {
      ...rest,
      color: color == null ? "" : color.name.toLowerCase(),
      completed: !currentTodo?.completed,
    };

    swal({
      title: "Are you sure?",
      text: "Click OK if you've already completed this to-do",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willCheck) => {
      if (willCheck) {
        async function asyncUpdate(cb) {
          swal({
            text: "UPDATING...",
            buttons: false,
          });
          const result = await updateTodo(updatedTodo);

          if (result) return cb();
          notifyFailure("Update unsuccessfully");
        }

        asyncUpdate(() => {
          notifySuccess("Todo updated successfully!");
        });
      } else {
        swal("Please complete your to-do");
      }
    });
  };

  const onColorChanged = (e) => {
    const currentColor = e.target.value;
    const { created_at, ...rest } = currentTodo;
    const updatedTodo = { ...rest, color: currentColor.toLowerCase() };
    setSelectedColor(currentColor);

    async function asyncUpdate(cb) {
      swal({
        text: "UPDATING...",
        buttons: false,
      });

      const result = await updateTodo(updatedTodo);

      if (result) return cb();
      notifyFailure("Update unsuccessfully");
    }

    asyncUpdate(() => {
      notifySuccess("Todo updated successfully!");
    });
  };
  const onDeleteTodoClicked = () => {
    async function asyncDelete(cb) {
      const result = await deleteToDo(id);

      if (result) return cb();
      notifyFailure("Delete unsuccessfully");
    }

    asyncDelete(() => {
      notifySuccess("Todo deleted successfully!");
    });
  };

  const renderedColors = () => {
    return colors?.map((color) => (
      <MenuItem
        key={color?.id}
        sx={{ color: COLORS_CODE[color?.name] }}
        value={color?.name}
      >
        {color?.name}
      </MenuItem>
    ));
  };

  return (
    <Box
      sx={{
        p: "0.5rem",
        pr: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        backgroundColor: "#ddd",
        borderRadius: "4px",
        mb: "1rem",
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Checkbox
          checked={currentTodo?.completed}
          disabled={currentTodo?.completed}
          onChange={onCompleteTodoChanged}
          sx={{
            pointerEvents: filterStatus === "deleted" && "none",
          }}
        />
        <Typography>{currentTodo?.text}</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
        >
          <InputLabel id="demo-select-small">Color</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={selectedColor}
            label="Age"
            onChange={onColorChanged}
            sx={{
              "& .MuiSelect-select": {
                color: COLORS_CODE[selectedColor],
              },
            }}
            disabled={filterStatus === "deleted"}
          >
            {renderedColors()}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<SettingsIcon />}
          onClick={() => setOpen(true)}
          disabled={filterStatus === "deleted"}
        >
          Edit
        </Button>
        <LoadingButton
          loading={isLoadingDelete}
          loadingIndicator="REMOVING"
          sx={{
            alignItems: "center",
          }}
          variant="contained"
          startIcon={<DeleteIcon />}
          color="warning"
          onClick={onDeleteTodoClicked}
          disabled={filterStatus === "deleted"}
        >
          REMOVE
        </LoadingButton>
      </Box>

      <ModalUpdate
        isOpen={open}
        onClose={() => setOpen(false)}
        id={id}
        todo={currentTodo}
      />
    </Box>
  );
}

export default TodoItem;
