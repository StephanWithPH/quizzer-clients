import store from './store/store';
import { getQuizTeamsActionAsync } from './actions/teamActionCreator';
import { getRoundsActionAsync } from './actions/roundActionCreator';
import setScoreboardConnectedAction from './actions/scoreboardStateActionCreator';
import {
  getImagesActionAsync, getQuizzesActionAsync,
  setDashboardConnectedAction,
} from './actions/dashboardActionCreator';
import { getTotalAmountsActionAsync } from './actions/sideBarActionCreator';

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

  theSocket.onopen = () => {
    theSocket.send(JSON.stringify({
      type: 'TOKEN',
      payload: window.sessionStorage.getItem('token'),
    }));
  };

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
    case 'TEAM_JOINED':
      store.dispatch(getQuizTeamsActionAsync());
      break;
    case 'TEAM_ANSWERED':
      store.dispatch(getRoundsActionAsync());
      break;
    case 'SCOREBOARD_CONNECTED':
      store.dispatch(setScoreboardConnectedAction(true));
      break;
      // Dashboard Events
    case 'SOCKET_CONNECTED':
      store.dispatch(setDashboardConnectedAction(true));
      break;
    case 'SOCKET_DISCONNECTED':
      store.dispatch(setDashboardConnectedAction(false));
      break;
    case 'NEW_TEAM':
    case 'NEW_QUIZ':
    case 'NEW_ROUND':
    case 'ROUND_FINISHED':
    case 'QUIZ_ENDED':
      store.dispatch(getTotalAmountsActionAsync());
      store.dispatch(getImagesActionAsync());
      store.dispatch(getQuizzesActionAsync());
      break;
    default:
      break;
  }
}
