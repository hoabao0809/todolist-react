import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/todos" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
