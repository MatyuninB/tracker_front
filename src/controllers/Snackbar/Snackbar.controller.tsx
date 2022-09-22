import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Snackbar } from "src/components/Snackbar/Snackbar.component";
import type { RCP } from "types/global";
import {
  SnackbarContext,
  snackbarContextInitialValue,
  SnackbarControllerValue,
} from "./Snackbar.provider";

export interface SnackbarControllerP extends RCP {}

export const SnackbarController = ({ children }: SnackbarControllerP) => {
  const [messages, setMessages] = useState(
    snackbarContextInitialValue.messages
  );

  const alert = useCallback(
    (title: string, description: string, delay = 3100) => {
      setMessages((prev) => [
        ...prev,
        { type: "alert", title, description, id: Math.random() + 'snack' },
      ]);
      setTimeout(
        () =>
          setMessages((prev) => {
            const newArr = [...prev];
            newArr.shift();
            return newArr;
          }),
        delay
      );
    },
    []
  );

  const error = useCallback(
    (title: string, description: string, delay = 3100) => {
      setMessages((prev) => [
        ...prev,
        { type: "error", title, description, id: Date.now().toString() },
      ]);
      setTimeout(
        () =>
          setMessages((prev) => {
            const newArr = [...prev];
            newArr.shift();
            return newArr;
          }),
        delay
      );
    },
    []
  );

  const value = useMemo<SnackbarControllerValue>(
    () => ({
      messages,
      alert,
      error,
    }),
    [messages]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {messages.map((message, i) => (
        <Snackbar
          key={message.id}
          count={i}
          variant={message.type}
          {...message}
        />
      ))}
    </SnackbarContext.Provider>
  );
};
