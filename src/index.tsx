import React from "react";
import ReactDOM from "react-dom";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { App } from "./pages";
import "./styles/global.css";
import { Timer } from "./helpers/timer.helper";

new Timer();

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}

dayjs.extend(duration);
