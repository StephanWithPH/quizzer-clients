import {createSlice} from "@reduxjs/toolkit";
import Question from "../models/question.ts";

const initialState: Question[] = [];

export const questionSlice = createSlice({
  name: 'questions',
    initialState,
    reducers: {
      setQuestions: (_, action) => {
        return [
          ...action.payload,
        ];
      }
    }
});

export const { setQuestions } = questionSlice.actions;

export default questionSlice.reducer;