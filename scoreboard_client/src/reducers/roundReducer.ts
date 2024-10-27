import Round from "../models/round.ts";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Round[] = [];

export const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    setRounds: (_state, action) => {
      return [...action.payload];
    },
  },
});

export const { setRounds } = roundSlice.actions;

export default roundSlice.reducer;
