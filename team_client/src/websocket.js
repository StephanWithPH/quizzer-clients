import store from './store/store';
import changeRouteAction from './actions/routerActionCreator';
import { getRoundsActionAsync } from './actions/roundActionCreator';
import { clearQuestionAction } from './actions/questionActionCreator';
import { getTeamActionAsync } from './actions/teamActionCreator';

const serverHostname = process.env.REACT_APP_WS_URL;

let theSocket;

let reconnectTimeout;

export function openWebSocket(handler) {
  if (theSocket) {
    theSocket.onerror = null;
    theSocket.onopen = null;
    theSocket.onclose = null;
    theSocket.close();
  }
  theSocket = new WebSocket(serverHostname);

  theSocket.onmessage = handler;

  theSocket.onclose = (event) => {
    if (!event.wasClean && !reconnectTimeout) {
      reconnectTimeout = setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log('Connection lost. Reconnecting...');
        openWebSocket(handler);
        reconnectTimeout = null;
      }, 3000);
    }
  };
  return theSocket;
}

export function getWebSocket() {
  if (theSocket) {
    return theSocket;
  }
  throw new Error('The websocket has not been opened yet.');
}

export function messageHandler(msg) {
  switch (JSON.parse(msg.data).type) {
    case 'TEAM_ACCEPTED':
      store.dispatch(changeRouteAction('lobby'));
      break;
    case 'TEAM_DECLINED':
      document.title = 'Team';
      store.dispatch(changeRouteAction('rejected'));
      break;
    case 'NEW_QUESTION':
      store.dispatch(changeRouteAction('question'));
      store.dispatch(clearQuestionAction());
      store.dispatch(getRoundsActionAsync());
      break;
    case 'ROUND_FINISHED':
      store.dispatch(getTeamActionAsync());
      store.dispatch(changeRouteAction('lobby'));
      break;
    case 'QUIZ_ENDED':
      document.title = 'Team';
      store.dispatch(changeRouteAction('login'));
      break;
    case 'QUESTION_CLOSED':
      store.dispatch(getRoundsActionAsync());
      break;
    default:
      break;
  }
}
