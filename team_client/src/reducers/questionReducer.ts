import { createSlice } from '@reduxjs/toolkit';

interface QuestionState {
    answer: string;
    givenAnswer: string;
}

const initialState: QuestionState = {
    answer: '',
    givenAnswer: ''
};

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setAnswer: (state, action) => {
            state.answer = action.payload;
        },
        setGivenAnswer: (state, action) => {
            state.givenAnswer = action.payload;
        },
        clearQuestion: (state) => {
            state.answer = '';
            state.givenAnswer = '';
        }
    }
});

export const { setAnswer, setGivenAnswer, clearQuestion } = questionSlice.actions;

export default questionSlice.reducer;
