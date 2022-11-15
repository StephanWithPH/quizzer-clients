import toastr from 'toastr';
import changeRouteAction from './routerActionCreator';
import { messageHandler, openWebSocket } from '../websocket';

const serverURL = process.env.REACT_APP_API_URL;

export function setLobbyCodeAction(lobbyCode) {
  return {
    type: 'SET_LOBBY_CODE',
    payload: lobbyCode,
  };
}

export function connectScoreboardActionAsync(lobbyCode) {
  return (dispatch) => {
    fetch(`${serverURL}/api/v1/scoreboard/quizzes/${lobbyCode}/scoreboards`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => { throw new Error(text); });
        }
        dispatch(setLobbyCodeAction(lobbyCode));
        document.title = `Scoreboard - ${lobbyCode}`;
        dispatch(changeRouteAction('scoreboard'));
        openWebSocket(messageHandler);
        return res.json();
      })
      .catch((err) => {
        const message = JSON.parse(err.message).error;
        toastr.error(message);
      });
  };
}
