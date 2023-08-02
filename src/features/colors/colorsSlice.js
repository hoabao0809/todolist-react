import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorsApi from "../../api/colorsApi";
import { LOADING_STATUS } from "../../constants";

const fetchColors = createAsyncThunk(
  "color/fetchColors",
  async (_, { rejectWithValue }) => {
    try {
      const colors = await colorsApi.getColors();
      if (colors.status === 200) return colors.data.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  colors: [],
};

const colorFilterSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state, action) => {
        state.status = LOADING_STATUS.PENDING;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        const data = action.payload;
        state.colors = data;
        state.status = LOADING_STATUS.SUCCEEDED;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        const { error } = action.payload;
        state.status = LOADING_STATUS.FAILED;
        console.log(error);
      });
  },
});

// Async functions
export { fetchColors };

// Slice
export const selectColors = (state) => state.colors.colors;
export default colorFilterSlice.reducer;
