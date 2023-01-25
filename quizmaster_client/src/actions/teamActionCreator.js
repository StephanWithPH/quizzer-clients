import { toast } from 'react-toastify';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setQuizTeamsAction(teams) {
  return {
    type: 'SET_TEAMS',
    payload: teams,
  };
}

export function getQuizTeamsActionAsync() {
  return async (dispatch, getState) => {
    const { global } = getState();
    const doFetch = fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/teams`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Teams ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het ophalen van de teams!';
          },
        },
      },
    ).then((teams) => {
      dispatch(setQuizTeamsAction(teams));
    });
  };
}
