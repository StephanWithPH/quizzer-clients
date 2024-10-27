import { createSlice } from '@reduxjs/toolkit';
import Team from '../models/team.ts';

const initialState: Team = {
    _id: '',
    name: '',
    roundPoints: 0,
    accepted: false,
    image: undefined
};

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setTeam: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.roundPoints = action.payload.roundPoints;
            state.accepted = action.payload.accepted;
        }
    }
});

export const { setTeam } = teamSlice.actions;

export default teamSlice.reducer;
