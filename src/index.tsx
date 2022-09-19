import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import { TestPage } from "./pages/Test.page";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { SnackbarController } from "./controllers/Snackbar/Snackbar.controller";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarController>
      <TestPage />
    </SnackbarController>
  </React.StrictMode>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}

dayjs.extend(duration);
