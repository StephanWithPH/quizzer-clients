import toastr from 'toastr';
import fetcher from '../fetcher';
import { setTeam } from '../reducers/teamReducer.ts';
import { AppDispatch, RootState } from '../store/store.ts';

const serverURL = import.meta.env.VITE_API_URL;

export function getTeamActionAsync() {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const { global } = getState();
        const { team } = getState();
        fetcher(`${serverURL}/team/quiz/${global.lobbyCode}/teams/${team._id}`, {
            credentials: 'include'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
                return res.json();
            })
            .then((resJson) => {
                dispatch(setTeam(resJson));
            })
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };
}
