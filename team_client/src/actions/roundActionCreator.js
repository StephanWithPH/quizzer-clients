import toastr from 'toastr';

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
    fetch(`${serverURL}/api/v1/team/quizzes/${global.lobbyCode}/rounds`, {
      credentials: 'include',
    })
      .then((r) => {
        if (!r.ok) {
          return r.text().then((text) => { throw new Error(text); });
        }
        return r.json();
      })
      .then((json) => {
        dispatch(setRoundsAction(json));
      }).catch((err) => {
        const message = JSON.parse(err.message).error;
        toastr.error(message);
      });
  };
}
