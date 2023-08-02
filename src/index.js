import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { fetchColors } from "./features/colors/colorsSlice";

const container = document.getElementById("root");
const root = createRoot(container);

store.dispatch(fetchColors());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
