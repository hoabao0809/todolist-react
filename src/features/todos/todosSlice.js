// Note Bug: khi dùng onQueryStarted, giả sử khi chọn màu Green cho todo A, sau đó bật filter Green và xóa todo này, todo sẽ mất ở cache này. Nhưng khi bỏ Filter Green, todo vừa xóa vẫn còn trong cache cũ nên vẫn render (todos chỉ sync khi load lại sau 60s khi cache cũ bị xóa) => nên dùng onQueryStarted cho các get query k nhận params

import apiSlice from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query({
      query: (params) => {
        return {
          url: "",
          params,
        };
      },
      transformResponse: (res) => res.data,
      providesTags: (res = [], error, arg) => [
        { type: "Todos", id: "LIST" },
        ...res.map(({ id }) => ({
          type: "Todos",
          id,
        })),
      ],
    }),
    getTodo: build.query({
      query: (id) => `/${id}`,
      transformResponse: (res) => res.data,
    }),
    addTodo: build.mutation({
      query: (text) => ({
        url: "",
        method: "POST",
        body: { text },
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
      // async onQueryStarted(args, { queryFulfilled, dispatch, getState }) {
      //   // Pessimistic
      //   try {
      //     const { data: addedTodo } = await queryFulfilled;

      //     const filterState = getState().filter;
      //     const formattedFilterState = {
      //       ...filterState,
      //       sortBy: filterState.sortBy.type + filterState.sortBy.direction,
      //     };

      //     dispatch(
      //       extendedApiSlice.util.updateQueryData(
      //         "getTodos",
      //         formattedFilterState,
      //         (draft) => {
      //           draft?.unshift(addedTodo.data);
      //         }
      //       )
      //     );
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Todos", id }],
      // async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
      //   // Pessimistic

      // const filterState = getState().filter;
      // const formattedFilterState = {
      //   ...filterState,
      //   sortBy: filterState.sortBy.type + filterState.sortBy.direction,
      // };
      //   try {
      //     await queryFulfilled;

      //     dispatch(
      //       extendedApiSlice.util.updateQueryData(
      //         "getTodos",
      //         filterState,
      //         (draft) => {
      //           const newDraft = draft?.filter((item) => item.id !== id);
      //           return newDraft;
      //         }
      //       )
      //     );
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
    }),
    updateTodo: build.mutation({
      query: (data) => {
        const { id, ...rest } = data;
        const formattedData = {
          ...rest,
          completed: rest.completed.toString(),
        };

        return {
          url: `/${id}`,
          method: "PUT",
          body: JSON.stringify(formattedData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Todos", id }],
      // async onQueryStarted(
      //   { id, ...rest },
      //   { dispatch, queryFulfilled, getState }
      // ) {
      // const filterState = getState().filter;
      // const formattedFilterState = {
      //   ...filterState,
      //   sortBy: filterState.sortBy.type + filterState.sortBy.direction,
      // };
      //   let patchResult = dispatch(
      //     extendedApiSlice.util.updateQueryData(
      //       "getTodos",
      //       filterState,
      //       (draft) => {
      //         const updatedItem = draft.find((item) => item.id === id);
      //         const patched = {
      //           ...rest,
      //           completed: rest.completed.toString(),
      //         };
      //         Object.assign(updatedItem, patched);
      //       }
      //     )
      //   );

      //   try {
      //     await queryFulfilled;
      //   } catch (error) {
      //     patchResult.undo();
      //     // dispatch(
      //     //   extendedApiSlice.util.invalidateTags([{ type: "Todos", id }])
      //     // );
      //   }
      // },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = extendedApiSlice;
