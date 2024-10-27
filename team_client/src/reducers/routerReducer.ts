import { createSlice } from '@reduxjs/toolkit';
import { Routes } from '../enums/routes.ts';

interface RouterState {
    currentRoute: Routes;
}

const initialState: RouterState = {
    currentRoute: Routes.LOGIN
};

const routerSlice = createSlice({
    name: 'router',
    initialState,
    reducers: {
        setRoute: (state, action) => {
            state.currentRoute = action.payload;
        }
    }
});

export const { setRoute } = routerSlice.actions;

export default routerSlice.reducer;
