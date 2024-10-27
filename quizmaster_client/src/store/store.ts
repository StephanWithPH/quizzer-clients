import globalReducer from '../reducers/globalReducer';
import routerReducer from '../reducers/routerReducer';
import teamReducer from '../reducers/teamReducer';
import categoryReducer from '../reducers/categoryReducer';
import roundReducer from '../reducers/roundReducer';
import questionReducer from '../reducers/questionReducer';
import scoreboardStateReducer from '../reducers/scoreboardStateReducer';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        global: globalReducer,
        router: routerReducer,
        teams: teamReducer,
        categories: categoryReducer,
        rounds: roundReducer,
        questions: questionReducer,
        scoreboardState: scoreboardStateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
