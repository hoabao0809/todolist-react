import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: [],
  sortBy: {
    type: "date",
    direction: "Desc",
  },
  status: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addColors: (state, action) => {
      const { name, isChecked } = action.payload;
      const formattedName = name.toLowerCase();

      if (!isChecked) {
        const newState = state.colors.filter(
          (color) => color !== formattedName
        );
        state.colors = newState;
      } else {
        const newState = [...state.colors, formattedName];
        state.colors = newState;
      }
    },
    addSorts: (state, action) => {
      state.sortBy = { ...state.sortBy, ...action.payload };
    },
    addStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const selectColorsFilter = (state) => state.filter.colors;
export const selectSortsFilter = (state) => state.filter.sortBy;

export const { addColors, addSorts, addStatus } = filterSlice.actions;

export default filterSlice.reducer;
