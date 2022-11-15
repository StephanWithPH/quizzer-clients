import toastr from 'toastr';

const serverURL = process.env.REACT_APP_API_URL;

export function setQuizTeamsAction(teams) {
  return {
    type: 'SET_TEAMS',
    payload: teams,
  };
}

export function getQuizTeamsActionAsync() {
  return (dispatch, getState) => {
    const { global } = getState();
    fetch(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/teams`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((teams) => {
      dispatch(setQuizTeamsAction(teams));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };
}
