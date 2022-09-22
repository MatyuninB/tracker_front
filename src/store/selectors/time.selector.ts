import type { StoreRoot } from "../index.store";

export const timepointsSelector = (state: StoreRoot) => state.time?.info;
export const timeLoadingSelector = (state: StoreRoot) => state.time?.status;