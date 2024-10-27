import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
    lobbyCode: string | null;
    scoreboardConnected: boolean;
}

const initialState: GlobalState = {
    lobbyCode: null,
    scoreboardConnected: false
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLobbyCode: (state, action) => {
            state.lobbyCode = action.payload;
        },
        setScoreboardConnected: (state, action) => {
            state.scoreboardConnected = action.payload;
        }
    }
});

export const { setLobbyCode, setScoreboardConnected } = globalSlice.actions;

export default globalSlice.reducer;
