import { toast } from 'react-toastify';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setQuestionsAction(questions) {
  return {
    type: 'SET_QUESTIONS',
    payload: questions,
  };
}

export function getQuestionsActionAsync() {
  return async (dispatch, getState) => {
    const { global } = getState();
    const doFetch = fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/questions`, {}).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => { throw new Error(text); });
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Vragen ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het ophalen van de vragen!';
          },
        },
      },
    ).then((json) => {
      dispatch(setQuestionsAction(json));
    });
  };
}
