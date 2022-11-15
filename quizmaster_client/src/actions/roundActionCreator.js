import toastr from 'toastr';
import changeRouteAction from './routerActionCreator';

const serverURL = process.env.REACT_APP_API_URL;

export function setRoundsAction(rounds) {
  return {
    type: 'SET_ROUNDS',
    payload: rounds,
  };
}

export function getRoundsActionAsync() {
  return (dispatch, getState) => {
    const { global } = getState();
    fetch(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/rounds`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((rounds) => {
      dispatch(setRoundsAction(rounds));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };
}

export function createRoundActionAsync(chosenCategories) {
  return (dispatch, getState) => {
    const { global } = getState();
    fetch(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/rounds`, {
      method: 'POST',
      credentials: 'include',
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
    }).then(() => {
      dispatch(getRoundsActionAsync());
      dispatch(changeRouteAction('selectQuestion'));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };
}

export function addAskedQuestionActionAsync(questionId) {
  return (dispatch, getState) => {
    const { global, rounds } = getState();
    fetch(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/rounds/${rounds[rounds.length - 1]._id}/askedquestions`, {
      method: 'POST',
      credentials: 'include',
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
      dispatch(changeRouteAction('questionOverview'));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };
}

export function clearRoundAction() {
  return {
    type: 'CLEAR_ROUNDS',
  };
}
