import toastr from 'toastr';
import fetcher from '../fetcher';
import { AppDispatch, RootState } from '../store/store.ts';
import { setRounds } from '../reducers/roundReducer.ts';
import { setRoute } from '../reducers/routerReducer.ts';
import { Routes } from '../enums/routes.ts';

const serverURL = import.meta.env.VITE_API_URL;

export function getRoundsActionAsync() {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const { global } = getState();
        fetcher(`${serverURL}/quizMaster/quiz/${global.lobbyCode}/rounds`, {
            credentials: 'include'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
                return res.json();
            })
            .then((rounds) => {
                dispatch(setRounds(rounds));
            })
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };
}

export function createRoundActionAsync(chosenCategories: string[]) {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const { global } = getState();
        fetcher(`${serverURL}/quizMaster/quiz/${global.lobbyCode}/rounds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chosenCategories
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
            })
            .then(() => {
                dispatch(getRoundsActionAsync());
                dispatch(setRoute(Routes.SELECT_QUESTION));
            })
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };
}

export function addAskedQuestionActionAsync(questionId: string) {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const { global, rounds } = getState();
        fetcher(`${serverURL}/quizMaster/quiz/${global.lobbyCode}/rounds/${rounds[rounds.length - 1]._id}/askedQuestions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: questionId
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
                dispatch(setRoute(Routes.QUESTION_OVERVIEW));
            })
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };
}
