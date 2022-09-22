import React from "react";
import { Provider } from "react-redux";
import { SnackbarController } from "src/controllers/Snackbar/Snackbar.controller";
import { store } from "src/store/index.store";
import { TestPage } from "./Test/Test.page";

export const App = () => {
  return (
    <Provider store={store}>
      <SnackbarController>
        <TestPage />
      </SnackbarController>
    </Provider>
  );
};
