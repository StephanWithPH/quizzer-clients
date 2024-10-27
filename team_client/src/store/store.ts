import globalReducer from '../reducers/globalReducer';
import routerReducer from '../reducers/routerReducer';
import teamReducer from '../reducers/teamReducer';
import roundReducer from '../reducers/roundReducer';
import questionReducer from '../reducers/questionReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        global: globalReducer,
        router: routerReducer,
        team: teamReducer,
        rounds: roundReducer,
        question: questionReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
