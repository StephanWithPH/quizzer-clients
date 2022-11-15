import store from './store/store';
import { getQuizTeamsActionAsync } from './actions/teamActionCreator';
import { getQuizRoundsActionAsync } from './actions/roundActionCreator';
import { getCorrectQuestionsActionAsync } from './actions/correctQuestionsActionCreator';
import changeRouteAction from './actions/routerActionCreator';

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

export async function messageHandler(msg) {
  switch (JSON.parse(msg.data).type) {
    case 'TEAM_ACCEPTED':
      await store.dispatch(getQuizTeamsActionAsync());
      break;
    case 'QUESTION_APPROVED':
      await store.dispatch(getCorrectQuestionsActionAsync());
      break;
    case 'TEAM_ANSWERED':
    case 'QUESTION_CLOSED':
    case 'NEW_QUESTION':
    case 'NEW_ROUND':
    case 'ROUND_FINISHED':
      await store.dispatch(getQuizRoundsActionAsync());
      await store.dispatch(getQuizTeamsActionAsync());
      await store.dispatch(getCorrectQuestionsActionAsync());
      break;
    case 'QUIZ_ENDED':
      store.dispatch(changeRouteAction('podium'));
      break;
    default:
      break;
  }
}
