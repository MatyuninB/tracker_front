import { createContext } from "react";

export interface SnackBarMessage {
  type: "alert" | "error";
  title?: string;
  description?: string;
}

export interface SnackbarControllerValue {
  messages: SnackBarMessage[];
  alert: (title: string, description: string) => void;
  error: (title: string, description: string) => void;
}

export const snackbarContextInitialValue: SnackbarControllerValue = {
  messages: [],
  alert: () => {},
  error: () => {}
};

export const SnackbarContext = createContext<SnackbarControllerValue>(
  snackbarContextInitialValue
);
