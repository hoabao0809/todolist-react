export const FILTER_STATUS = {
  all: "all",
  active: "active",
  completed: "completed",
  deleted: "deleted",
};

export const MESSAGES = {
  all: "You have no to-dos. Please add one!",
  active: "You have no remaining todos!",
  completed: "You have completed all todos!",
  deleted: "There are no deleted items",
};

export const COLORS_CODE = {
  Green: "#008000",
  Blue: "#0000ff",
  Orange: "#ffa500",
  Purple: "#800080",
  Red: "#ff0000",
};

export const LOADING_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

export const API_ACTIONS = {
  FETCH_TODOS: "fetchingTodos",
  ADD_TODO: "addingTodo",
  UPDATE_TODO: "updatingTodo",
  DELETE_TODO: "deletingTodo",
};

export const SORTBY_ITEMS = [
  { type: "date", label: "Date" },
  { type: "name", label: "Name" },
];

export const ORDERBY_ITEMS = {
  date: [
    {
      direction: "Desc",
      label: "Latest",
    },
    {
      direction: "Asc",
      label: "Earliest",
    },
  ],
  name: [
    {
      direction: "Asc",
      label: "A-Z",
    },
    {
      direction: "Desc",
      label: "Z-A",
    },
  ],
};
