import { toast } from 'react-toastify';
import changeRouteAction from './routerActionCreator';
import { messageHandler, openWebSocket } from '../websocket';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setLobbyCodeAction(lobbyCode) {
  return {
    type: 'SET_LOBBY_CODE',
    payload: lobbyCode,
  };
}

export function createQuizActionAsync() {
  return async (dispatch) => {
    const doFetch = fetcher(`${serverURL}/api/v1/quizmaster/quizzes`, {
      method: 'POST',
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Creating quiz...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is iets fout gegaan met het aanmaken van de quiz';
          },
        },
      },
    ).then((json) => {
      window.sessionStorage.setItem('token', json.token);
      dispatch(setLobbyCodeAction(json.lobby));
      dispatch(changeRouteAction('lobby'));
      document.title = `Quizmaster - ${json.lobby}`;
      openWebSocket(messageHandler);
    });
  };
}
