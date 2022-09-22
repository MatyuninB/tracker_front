import { createAction } from "@reduxjs/toolkit";
import type { TotalTime } from "src/api/types/time.type";
import type { PromiseState } from "src/types/promiseState.type";

export const timeActions = {
  getTodayTime: createAction<string | undefined>("GET_TODAY_TIME"),
  getTodayTimeStatus: createAction<{ status: PromiseState; data?: TotalTime }>(
    "GET_TODAY_TIME_STATUS"
  ),
};
