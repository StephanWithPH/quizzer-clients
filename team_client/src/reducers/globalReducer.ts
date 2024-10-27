import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
    lobbyCode: string | null;
    roundNumber: number;
    questionNumber: number;
}
const initialState: GlobalState = {
    lobbyCode: null,
    roundNumber: 0,
    questionNumber: 0
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLobbyCode: (state, action) => {
            state.lobbyCode = action.payload;
        },
        setRoundNumber: (state, action) => {
            state.roundNumber = action.payload;
        },
        setQuestionNumber: (state, action) => {
            state.questionNumber = action.payload;
        }
    }
});

export const { setLobbyCode, setRoundNumber, setQuestionNumber } = globalSlice.actions;

export default globalSlice.reducer;
