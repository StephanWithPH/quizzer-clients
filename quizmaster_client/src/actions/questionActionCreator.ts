import toastr from 'toastr';
import fetcher from '../fetcher';
import { AppDispatch, RootState } from '../store/store.ts';
import { setQuestions } from '../reducers/questionReducer.ts';

const serverURL = import.meta.env.VITE_API_URL;

export function getQuestionsActionAsync() {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const { global } = getState();
        fetcher(`${serverURL}/quizMaster/quiz/${global?.lobbyCode}/questions`, {})
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
                return res.json();
            })
            .then((json) => {
                dispatch(setQuestions(json));
            })
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };
}
