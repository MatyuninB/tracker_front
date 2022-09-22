import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "src/api";
import { tasksActions } from "../actions/task.actions";

function* getAllRequest() {
  const tasks = (yield call(api.task.getAll.bind(api.task))) as {
    title: string;
    discription?: string;
  }[];
  console.log(tasks)
  yield put(tasksActions.getAllState({ data: tasks, status: "fullfield" }));
}

export function* taskSaga() {
  yield takeEvery(tasksActions.getAll, getAllRequest);
}
