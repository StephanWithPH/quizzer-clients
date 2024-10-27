import { createSlice } from '@reduxjs/toolkit';
import Round from '../models/round.ts';

interface RoundState {
    rounds: Round[] | [];
}

const initialState: RoundState = {
    rounds: []
};

export const roundSlice = createSlice({
    name: 'round',
    initialState,
    reducers: {
        setRounds: (state, action) => {
            return { ...state, rounds: action.payload };
        }
    }
});

export const { setRounds } = roundSlice.actions;

export default roundSlice.reducer;
