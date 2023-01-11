import toastr from 'toastr';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setQuizTeamsAction(teams) {
  return {
    type: 'SET_TEAMS',
    payload: teams,
  };
}

export function getQuizTeamsActionAsync() {
  return (dispatch, getState) => new Promise((resolve) => {
    const { global } = getState();
    fetcher(`${serverURL}/api/v1/scoreboard/quizzes/${global.lobbyCode}/teams`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((teams) => {
      dispatch(setQuizTeamsAction(teams));
      resolve();
    }).catch(() => {
      toastr.error('Er is een fout opgetreden met het ophalen van de teams!');
      resolve();
    });
  });
}
