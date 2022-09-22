import { createAction } from "@reduxjs/toolkit";
import type { PromiseState } from "src/types/promiseState.type";

export const tasksActions = {
  create: createAction<{ title: string; description?: string }>("CREATE_TASK"),
  getAll: createAction("GET_ALL_TASKS"),
  getAllState: createAction<{
    status: PromiseState;
    data: { title: string; descripton?: string }[];
  }>("GET_ALL_TASKS_STATE"),
};
