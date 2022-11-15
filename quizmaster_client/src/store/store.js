import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import globalReducer from '../reducers/globalReducer';
import routerReducer from '../reducers/routerReducer';
import teamReducer from '../reducers/teamReducer';
import categoryReducer from '../reducers/categoryReducer';
import roundReducer from '../reducers/roundReducer';
import questionReducer from '../reducers/questionReducer';
import scoreboardStateReducer from '../reducers/scoreboardStateReducer';

const store = createStore(
  combineReducers({
    global: globalReducer,
    router: routerReducer,
    teams: teamReducer,
    categories: categoryReducer,
    rounds: roundReducer,
    questions: questionReducer,
    scoreboardState: scoreboardStateReducer,
  }),
  applyMiddleware(thunk),
);

export default store;
