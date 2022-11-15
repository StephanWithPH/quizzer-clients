import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import routerReducer from '../reducers/routerReducer';
import globalReducer from '../reducers/globalReducer';
import teamReducer from '../reducers/teamReducer';
import roundReducer from '../reducers/roundReducer';
import correctQuestionReducer from '../reducers/correctQuestionReducer';

const store = createStore(
  combineReducers({
    global: globalReducer,
    router: routerReducer,
    teams: teamReducer,
    rounds: roundReducer,
    correctQuestions: correctQuestionReducer,
  }),
  applyMiddleware(thunk),
);

export default store;
