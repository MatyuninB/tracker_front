import type { StoreRoot } from "../index.store";

export const selectAllTasks = (state: StoreRoot) => state.task.tasks.concat(state.task.serverTasks)