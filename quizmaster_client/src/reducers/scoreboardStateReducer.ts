import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  scoreboardConnected: false,
};

export const scoreboardStateSlice = createSlice({
    name: 'scoreboardState',
    initialState,
    reducers: {
        setScoreboardConnected: (state, action) => {
            state.scoreboardConnected = action.payload;
        },
    },
});

export const {setScoreboardConnected} = scoreboardStateSlice.actions;

export default scoreboardStateSlice.reducer;
