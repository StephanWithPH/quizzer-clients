import toastr from 'toastr';

const serverURL = process.env.REACT_APP_API_URL;

export function setQuestionsAction(questions) {
  return {
    type: 'SET_QUESTIONS',
    payload: questions,
  };
}

export function getQuestionsActionAsync() {
  return (dispatch, getState) => {
    const { global } = getState();
    fetch(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/questions`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((json) => {
      dispatch(setQuestionsAction(json));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };
}
