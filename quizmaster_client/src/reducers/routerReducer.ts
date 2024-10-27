import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store.ts';
import { Routes } from '../enums/routes.ts';

interface RouterState {
    currentRoute: Routes;
}

const initialState: RouterState = {
    currentRoute: Routes.LOGIN
};

export const routerSlice = createSlice({
    name: 'router',
    initialState,
    reducers: {
        setRoute(state, action) {
            state.currentRoute = action.payload;
        }
    }
});

export const { setRoute } = routerSlice.actions;

export const selectCurrentRoute = (state: RootState) => state.router.currentRoute;

export default routerSlice.reducer;
