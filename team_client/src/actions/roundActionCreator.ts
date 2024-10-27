import toastr from 'toastr';
import fetcher from '../fetcher';
import { AppDispatch, RootState } from '../store/store.ts';
import { setRounds } from '../reducers/roundReducer.ts';

const serverURL = import.meta.env.VITE_API_URL;

export function getRoundsActionAsync() {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const { global } = getState();
        fetcher(`${serverURL}/team/quiz/${global.lobbyCode}/rounds`, {
            credentials: 'include'
        })
            .then(async (r) => {
                if (!r.ok) {
                    const text = await r.text();
                    throw new Error(text);
                }
                return r.json();
            })
            .then((json) => {
                dispatch(setRounds(json));
            })
            .catch((err) => {
                const message = JSON.parse(err.message).error;
                toastr.error(message);
            });
    };
}
