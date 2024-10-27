import { Routes } from "../enums/routes.ts";
import { createSlice } from "@reduxjs/toolkit";

interface RouterState {
  currentRoute: Routes;
}

const initialState: RouterState = {
  currentRoute: Routes.LOGIN,
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { setRoute } = routerSlice.actions;

export default routerSlice.reducer;
