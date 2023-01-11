import toastr from 'toastr';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setRoundsAction(teams) {
  return {
    type: 'SET_ROUNDS',
    payload: teams,
  };
}

export function getQuizRoundsActionAsync() {
  return (dispatch, getState) => new Promise((resolve) => {
    const { global } = getState();
    fetcher(`${serverURL}/api/v1/scoreboard/quizzes/${global.lobbyCode}/rounds`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((rounds) => {
      dispatch(setRoundsAction(rounds));
      resolve();
    }).catch(() => {
      toastr.error('Er is een fout opgetreden met het ophalen van de rondes!');
      resolve();
    });
  });
}
