import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSorts, selectSortsFilter } from "./filterSlice";

function SortItem({ label, sortOption, sortsList }) {
  const dispatch = useDispatch();
  const sortsFilter = useSelector(selectSortsFilter);

  const [sort, setSort] = useState(sortsFilter[sortOption]);

  const onSortFilterChanged = (e) => {
    const sortValue = e.target.value;
    const data = {
      [sortOption]: sortValue,
    };
    setSort(sortValue);
    dispatch(addSorts(data));
  };

  const renderedSortFilter = () => {
    return sortsList?.map((sortItem) => {
      return (
        <FormControlLabel
          key={sortItem[sortOption]}
          value={sortItem[sortOption]}
          control={<Radio />}
          label={sortItem.label}
        />
      );
    });
  };

  return (
    <FormControl
      sx={{
        m: 2,
      }}
    >
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onSortFilterChanged}
        value={sort}
      >
        {renderedSortFilter()}
      </RadioGroup>
    </FormControl>
  );
}

export default SortItem;
