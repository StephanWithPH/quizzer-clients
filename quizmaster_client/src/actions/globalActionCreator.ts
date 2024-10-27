import toastr from 'toastr';
import { openWebSocket } from '../websocket';
import fetcher from '../fetcher';
import { AppDispatch } from '../store/store.ts';
import { setLobbyCode } from '../reducers/globalReducer.ts';
import { setRoute } from '../reducers/routerReducer.ts';
import { Routes } from '../enums/routes.ts';

const serverURL = import.meta.env.VITE_API_URL;

export function createQuizActionAsync() {
    return (dispatch: AppDispatch) => {
        fetcher(`${serverURL}/quizMaster/quiz`, {
            method: 'POST'
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text);
                }
                return res.json();
            })
            .then((json) => {
                window.sessionStorage.setItem('token', json.token);
                dispatch(setLobbyCode(json.lobby));
                dispatch(setRoute(Routes.LOBBY));
                document.title = `QuizMaster - ${json.lobby}`;
                openWebSocket(json.lobby);
            })
            .catch((err) => {
                const message = JSON.parse(err.message).error;
                toastr.error(message);
            });
    };
}
