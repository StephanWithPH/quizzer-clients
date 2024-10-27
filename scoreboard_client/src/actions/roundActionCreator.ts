import toastr from "toastr";
import fetcher from "../fetcher";
import { AppDispatch, RootState } from "../store/store.ts";
import { setRounds } from "../reducers/roundReducer.ts";

const serverURL = import.meta.env.VITE_API_URL;

export function getQuizRoundsActionAsync() {
  return (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve) => {
      const { global } = getState();
      fetcher(`${serverURL}/scoreboard/quiz/${global.lobbyCode}/rounds`, {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((rounds) => {
          dispatch(setRounds(rounds));
          resolve(null);
        })
        .catch(() => {
          toastr.error("Er is een fout opgetreden!");
          resolve(null);
        });
    });
}
