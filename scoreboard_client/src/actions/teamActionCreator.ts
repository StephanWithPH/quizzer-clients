import toastr from "toastr";
import fetcher from "../fetcher";
import { AppDispatch, RootState } from "../store/store.ts";
import { setTeams } from "../reducers/teamReducer.ts";

const serverURL = import.meta.env.VITE_API_URL;

export function getQuizTeamsActionAsync() {
  return (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve) => {
      const { global } = getState();
      fetcher(`${serverURL}/scoreboard/quiz/${global.lobbyCode}/teams`, {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((teams) => {
          dispatch(setTeams(teams));
          resolve(null);
        })
        .catch(() => {
          toastr.error("Er is een fout opgetreden!");
          resolve(null);
        });
    });
}
