import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rootSaga } from "./saga/root.saga";
import { reducer as user } from "./slice/user.slice";
import { reducer as time } from "./slice/time.slice";
import { reducer as task } from "./slice/task.slice";
import * as saga from "redux-saga";

// @ts-ignore
export const sagaMiddleware = saga.__moduleExports.default();

export const store = configureStore({
  reducer: {
    user,
    time,
    task,
  },
  middleware: (gDM) => gDM().concat(sagaMiddleware),
});

export type StoreRoot = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);
