import {createSlice} from "@reduxjs/toolkit";
import Team from "../models/team.ts";

const initialState: Team[] = [];

export const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setTeams: (_, action) => {
            return [...action.payload];
        },
    },
});

export const { setTeams } = teamSlice.actions;

export default teamSlice.reducer;