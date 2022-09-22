import { createSlice } from "@reduxjs/toolkit";
import type { TotalTime } from "src/api/types/time.type";
import type { PromiseState } from "src/types/promiseState.type";
import { timeActions } from "../actions/time.actions";
import { slicesCost } from "../constants/slices.const";

export interface TimeSliceState {
  status: PromiseState | null;
  info?: TotalTime 
}

const value: TimeSliceState = {
  status: null,
}

export const { reducer } = createSlice({
  name: slicesCost.TIME,
  initialState: value,
  reducers: {},
  extraReducers(builder) {
      builder.addCase(timeActions.getTodayTimeStatus, (state, { payload }) => {
        state.status = payload.status;
        if (payload.status === "fullfield") {
          state.info = payload.data;
        }
      }); 
  },
})