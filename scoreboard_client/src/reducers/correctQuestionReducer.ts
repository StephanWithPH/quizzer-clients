import { CorrectAnswersByTeamId } from "../models/correctQuestion.ts";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CorrectAnswersByTeamId[] = [];

export const correctQuestionSlice = createSlice({
  name: "correctQuestion",
  initialState,
  reducers: {
    setCorrectAnswersPerTeam: (_state, action) => {
      return [...action.payload];
    },
  },
});

export const { setCorrectAnswersPerTeam } = correctQuestionSlice.actions;

export default correctQuestionSlice.reducer;
