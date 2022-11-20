import toastr from 'toastr';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setCorrectQuestionsAction(list) {
  return {
    type: 'SET_CORRECT_QUESTIONS',
    payload: list,
  };
}

export function getCorrectQuestionsActionAsync() {
  return (dispatch, getState) => new Promise((resolve) => {
    const { global, rounds } = getState();
    fetcher(`${serverURL}/api/v1/scoreboard/quizzes/${global.lobbyCode}/rounds/${rounds[rounds.length - 1]._id}/askedquestions`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      }).then((items) => {
        const list = [];
        items.forEach((item) => {
          list.push({
            _id: item.team._id,
            correctAnswers: item.correctAnswers,
          });
        });
        dispatch(setCorrectQuestionsAction(list));
        resolve();
      })
      .catch(() => {
        toastr.error('Er is iets fout gegaan!');
        resolve();
      });
  });
}
