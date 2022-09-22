import { createSlice } from "@reduxjs/toolkit";
import { userAction } from "../actions/user.actions";
import { slicesCost } from "../constants/slices.const";

const initialUserState = {

};

export const { reducer } = createSlice({
  name: slicesCost.USER,
  initialState: initialUserState,
  reducers: {
    [userAction.get.name]: () => {}
  }
});