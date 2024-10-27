import toastr from "toastr";
import { openWebSocket } from "../websocket";
import fetcher from "../fetcher";
import { AppDispatch } from "../store/store.ts";
import { setLobbyCode } from "../reducers/globalReducer.ts";
import { setRoute } from "../reducers/routerReducer.ts";
import { Routes } from "../enums/routes.ts";

const serverURL = import.meta.env.VITE_API_URL;

export function connectScoreboardActionAsync(lobbyCode: string) {
  return (dispatch: AppDispatch) => {
    fetcher(`${serverURL}/scoreboard/quiz/${lobbyCode}/scoreboard`, {
      method: "POST",
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then((json) => {
        window.sessionStorage.setItem("token", json.token);
        dispatch(setLobbyCode(lobbyCode));
        document.title = `Scoreboard - ${lobbyCode}`;
        dispatch(setRoute(Routes.SCOREBOARD));
        openWebSocket(lobbyCode);
      })
      .catch((err) => {
        const message = JSON.parse(err.message).error;
        toastr.error(message);
      });
  };
}
