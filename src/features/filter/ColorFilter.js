import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLORS_CODE } from "../../constants";
import { selectColors } from "../colors/colorsSlice";
import { addColors } from "./filterSlice";

function ColorFilter() {
  const dispatch = useDispatch();
  const colors = useSelector(selectColors);

  const onColorFilterChanged = (e) => {
    const data = {
      name: e.target.name,
      isChecked: e.target.checked,
    };
    dispatch(addColors(data));
  };

  const renderedColors = () => {
    return colors?.map((color) => (
      <FormControlLabel
        key={color?.id}
        control={<Checkbox name={color?.name} />}
        label={color?.name}
        sx={{
          color: COLORS_CODE[color?.name],
          "&.Mui-checked": {
            color: COLORS_CODE[color?.name],
          },
        }}
        onChange={onColorFilterChanged}
      />
    ));
  };

  return (
    <FormControl
      sx={{
        m: 2,
      }}
      component="fieldset"
      variant="standard"
    >
      <FormLabel component="legend">Filter by Color</FormLabel>
      <FormGroup sx={{ flexDirection: "row" }}>{renderedColors()}</FormGroup>
    </FormControl>
  );
}

export default ColorFilter;
