import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { api } from "src/api";
import type { TotalTime } from "src/api/types/time.type";
import type { PromiseState } from "src/types/promiseState.type";
import { timeActions } from "../actions/time.actions";
import { store } from "../index.store";
import { timeLoadingSelector } from "../selectors/time.selector";

function* getTodayTime() {
  const loadingStatus = timeLoadingSelector(store.getState());
  if (loadingStatus === "pending") return;
  try {
    yield put(timeActions.getTodayTimeStatus({status: 'pending'}));
    const time = (yield call(api.time.getTodayTimepoints.bind(api.time))) as TotalTime;
    yield put(timeActions.getTodayTimeStatus({status: "fullfield", data: time}));
  } catch(e) {
    yield put(timeActions.getTodayTimeStatus({status: 'reject'}));
  }
}

export function* timeSaga() {
  yield takeEvery(timeActions.getTodayTime.type, getTodayTime);
}
