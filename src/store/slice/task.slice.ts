import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PromiseState } from "src/types/promiseState.type";
import { tasksActions } from "../actions/task.actions";
import { slicesCost } from "../constants/slices.const";

interface TaskInitialState {
  serverTasks: { title: string; discription?: string }[];
  tasks: { title: string; discription?: string }[];
  status?: PromiseState;
}

const initialState: TaskInitialState = {
  serverTasks: [],
  tasks: [],
};

export const { reducer } = createSlice({
  name: slicesCost.TASKS,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(tasksActions.create, (state, { payload }) => {
      state.tasks = [...state.tasks, payload];
    });
    builder.addCase(tasksActions.getAllState, (state, { payload }) => {
      if (payload.status === "fullfield") {
        state.serverTasks = payload.data;
      }
    });
  },
});
