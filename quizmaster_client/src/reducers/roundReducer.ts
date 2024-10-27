import {createSlice} from "@reduxjs/toolkit";
import Round from "../models/round.ts";

const initialState: Round[] = [];

export const roundSlice = createSlice({
    name: 'rounds',
    initialState,
    reducers: {
        setRounds: (_, action) => {
            return [
                ...action.payload,
            ];
        },
        clearRounds: () => {
            return initialState;
        },
    },
});

export const { setRounds, clearRounds } = roundSlice.actions;

export default roundSlice.reducer;
