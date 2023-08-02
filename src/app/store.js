import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import colorReducer from "../features/colors/colorsSlice";
import filterReducer from "../features/filter/filterSlice";
import apiSlice from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    colors: colorReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});
