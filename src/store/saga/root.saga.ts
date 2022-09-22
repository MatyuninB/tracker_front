import { all } from "redux-saga/effects";
import { taskSaga } from "./task.saga";
import { timeSaga } from "./time.saga";

export function* rootSaga() {
  yield all([timeSaga(), taskSaga()]);
}