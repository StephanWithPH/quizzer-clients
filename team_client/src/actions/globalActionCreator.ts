import toastr from 'toastr';
import { openWebSocket } from '../websocket';
import fetcher from '../fetcher';
import { AppDispatch } from '../store/store.ts';
import { setRoute } from '../reducers/routerReducer.ts';
import { setTeam } from '../reducers/teamReducer.ts';
import { Routes } from '../enums/routes.ts';
import { setLobbyCode } from '../reducers/globalReducer.ts';

const serverURL = import.meta.env.VITE_API_URL;

export function addTeamToQuizActionAsync(lobbyCode: string, teamName: string, dataUri: string | undefined) {
    let dataUriParam: string | undefined = dataUri;
    if (dataUri?.length === 0) {
        dataUriParam = undefined;
    }
    return (dispatch: AppDispatch) =>
        new Promise((resolve) => {
            fetcher(`${serverURL}/team/quiz/${lobbyCode}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: teamName,
                    image: dataUriParam
                })
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.text().then((text) => {
                            throw new Error(text);
                        });
                    }

                    return res.json();
                })
                .then((json) => {
                    window.sessionStorage.setItem('token', json.token);
                    dispatch(setTeam(json));
                    dispatch(setLobbyCode(lobbyCode));
                    document.title = `${teamName} - ${lobbyCode}`;
                    dispatch(setRoute(Routes.WAITING));
                    openWebSocket(lobbyCode);
                    resolve(null);
                })
                .catch((err) => {
                    const message = JSON.parse(err.message).error;
                    toastr.error(message);
                    resolve(null);
                });
        });
}
