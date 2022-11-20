import toastr from 'toastr';
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

export function connectScoreboardActionAsync(lobbyCode) {
  return (dispatch) => {
    fetcher(`${serverURL}/api/v1/scoreboard/quizzes/${lobbyCode}/scoreboards`, {
      method: 'POST',
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => { throw new Error(text); });
        }
        return res.json();
      })
      .then((json) => {
        window.sessionStorage.setItem('token', json.token);
        dispatch(setLobbyCodeAction(lobbyCode));
        document.title = `Scoreboard - ${lobbyCode}`;
        dispatch(changeRouteAction('scoreboard'));
        openWebSocket(messageHandler);
      })
      .catch((err) => {
        const message = JSON.parse(err.message).error;
        toastr.error(message);
      });
  };
}
