import { toast } from 'react-toastify';
import changeRouteAction from './routerActionCreator';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setRoundsAction(rounds) {
  return {
    type: 'SET_ROUNDS',
    payload: rounds,
  };
}

export function getRoundsActionAsync() {
  return async (dispatch, getState) => {
    const { global } = getState();
    const doFetch = fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/rounds`, {
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
        pending: 'Rondes ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het ophalen van de rondes!';
          },
        },
      },
    ).then((rounds) => {
      dispatch(setRoundsAction(rounds));
    });
  };
}

export function createRoundActionAsync(chosenCategories) {
  return async (dispatch, getState) => {
    const { global } = getState();
    const doFetch = fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/rounds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chosenCategories,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Ronde aanmaken...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het aanmaken van een ronde!';
          },
        },
      },
    ).then(() => {
      dispatch(getRoundsActionAsync());
      dispatch(changeRouteAction('selectQuestion'));
    });
  };
}

export function addAskedQuestionActionAsync(questionId) {
  return async (dispatch, getState) => {
    const { global, rounds } = getState();
    const doFetch = fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/rounds/${rounds[rounds.length - 1]._id}/askedquestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: questionId,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Vraag toevoegen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het toevoegen van een vraag!';
          },
        },
      },
    ).then(() => {
      dispatch(changeRouteAction('questionOverview'));
    });
  };
}

export function clearRoundAction() {
  return {
    type: 'CLEAR_ROUNDS',
  };
}
