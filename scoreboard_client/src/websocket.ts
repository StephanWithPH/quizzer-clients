import { io, Socket } from "socket.io-client";
import store from "./store/store.ts";
import { getQuizTeamsActionAsync } from "./actions/teamActionCreator.ts";
import { getCorrectQuestionsActionAsync } from "./actions/correctQuestionsActionCreator.ts";
import { setRoute } from "./reducers/routerReducer.ts";
import { Routes } from "./enums/routes.ts";
import { getQuizRoundsActionAsync } from "./actions/roundActionCreator.ts";

const serverHostname: string =
  import.meta.env.VITE_WS_URL || "ws://localhost:4000";

let socket: Socket | undefined;

enum MessageEvents {
  TEAM_ACCEPTED = "TEAM_ACCEPTED",
  QUESTION_APPROVED = "QUESTION_APPROVED",
  TEAM_ANSWERED = "TEAM_ANSWERED",
  QUESTION_CLOSED = "QUESTION_CLOSED",
  NEW_QUESTION = "NEW_QUESTION",
  NEW_ROUND = "NEW_ROUND",
  ROUND_FINISHED = "ROUND_FINISHED",
  QUIZ_ENDED = "QUIZ_ENDED",
}

export function openWebSocket(lobby: string) {
  socket = io(serverHostname);

  socket.on("connect", () => {
    console.log("Connected to websocket server.");

    socket?.emit("TOKEN", window.sessionStorage.getItem("token"));
    socket?.emit("JOIN", lobby);
  });

  socket.on(MessageEvents.TEAM_ACCEPTED, async () => {
    await store.dispatch(getQuizTeamsActionAsync());
  });

  socket.on(MessageEvents.QUESTION_APPROVED, async () => {
    await store.dispatch(getCorrectQuestionsActionAsync());
  });

  socket.on(MessageEvents.TEAM_ANSWERED, async () => {
    await handleUpdateAll();
  });

  socket.on(MessageEvents.QUESTION_CLOSED, async () => {
    await handleUpdateAll();
  });

  socket.on(MessageEvents.NEW_QUESTION, async () => {
    await handleUpdateAll();
  });

  socket.on(MessageEvents.NEW_ROUND, async () => {
    await handleUpdateAll();
  });

  socket.on(MessageEvents.ROUND_FINISHED, async () => {
    await handleUpdateAll();
  });

  socket.on(MessageEvents.QUIZ_ENDED, () => {
    store.dispatch(setRoute(Routes.PODIUM));
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from websocket server.");
  });
}

const handleUpdateAll = async () => {
  await store.dispatch(getQuizRoundsActionAsync());
  await store.dispatch(getQuizTeamsActionAsync());
  await store.dispatch(getCorrectQuestionsActionAsync());
};
