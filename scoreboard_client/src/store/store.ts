import globalReducer from "../reducers/globalReducer.ts";
import routerReducer from "../reducers/routerReducer.ts";
import teamReducer from "../reducers/teamReducer.ts";
import roundReducer from "../reducers/roundReducer.ts";
import correctQuestionReducer from "../reducers/correctQuestionReducer.ts";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    global: globalReducer,
    router: routerReducer,
    teams: teamReducer,
    rounds: roundReducer,
    correctQuestions: correctQuestionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
