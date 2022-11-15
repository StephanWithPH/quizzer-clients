import toastr from 'toastr';
import { setTeamAction } from './teamActionCreator';
import changeRouteAction from './routerActionCreator';
import { messageHandler, openWebSocket } from '../websocket';

const serverURL = process.env.REACT_APP_API_URL;

export function setLobbyCodeAction(lobbyCode) {
  return {
    type: 'SET_LOBBY_CODE',
    payload: lobbyCode,
  };
}

export function addTeamToQuizActionAsync(lobbyCode, teamName, dataUri) {
  let dataUriParam = dataUri;
  if (dataUri.length === 0) {
    dataUriParam = undefined;
  }
  return (dispatch) => new Promise((resolve) => {
    fetch(`${serverURL}/api/v1/team/quizzes/${lobbyCode}/teams`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: teamName,
        image: dataUriParam,
      }),
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => { throw new Error(text); });
      }

      return res.json();
    }).then((json) => {
      dispatch(setTeamAction(json));
      dispatch(setLobbyCodeAction(lobbyCode));
      document.title = `${teamName} - ${lobbyCode}`;
      dispatch(changeRouteAction('waiting'));
      openWebSocket(messageHandler);
      resolve();
    }).catch((err) => {
      const message = JSON.parse(err.message).error;
      toastr.error(message);
      resolve();
    });
  });
}
