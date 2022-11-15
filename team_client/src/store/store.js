import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import globalReducer from '../reducers/globalReducer';
import routerReducer from '../reducers/routerReducer';
import teamReducer from '../reducers/teamReducer';
import roundReducer from '../reducers/roundReducer';
import questionReducer from '../reducers/questionReducer';

const store = createStore(
  combineReducers({
    global: globalReducer,
    router: routerReducer,
    team: teamReducer,
    rounds: roundReducer,
    question: questionReducer,
  }),
  applyMiddleware(thunk),
);

export default store;
