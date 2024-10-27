import { io, Socket } from 'socket.io-client';
import store from './store/store.ts';
import { setRoute } from './reducers/routerReducer.ts';
import { getTeamActionAsync } from './actions/teamActionCreator.ts';
import { clearQuestion } from './reducers/questionReducer.ts';
import { getRoundsActionAsync } from './actions/roundActionCreator.ts';
import { Routes } from './enums/routes.ts';

const serverHostname: string = import.meta.env.VITE_WS_URL || 'ws://localhost:4000';

let socket: Socket | undefined;

enum MessageEvents {
    TEAM_ACCEPTED = 'TEAM_ACCEPTED',
    TEAM_DECLINED = 'TEAM_DECLINED',
    NEW_QUESTION = 'NEW_QUESTION',
    ROUND_FINISHED = 'ROUND_FINISHED',
    QUIZ_ENDED = 'QUIZ_ENDED',
    QUESTION_CLOSED = 'QUESTION_CLOSED'
}

export function openWebSocket(lobby: string) {
    socket = io(serverHostname);

    socket.on('connect', () => {
        console.log('Connected to websocket server.');

        socket?.emit('TOKEN', window.sessionStorage.getItem('token'));
        socket?.emit('JOIN', lobby);
    });

    socket.on(MessageEvents.TEAM_ACCEPTED, () => store.dispatch(setRoute(Routes.LOBBY)));
    socket.on(MessageEvents.TEAM_DECLINED, () => store.dispatch(setRoute(Routes.REJECTED)));
    socket.on(MessageEvents.NEW_QUESTION, () => {
        store.dispatch(setRoute(Routes.QUESTION));
        store.dispatch(clearQuestion());
        store.dispatch(getRoundsActionAsync());
    });
    socket.on(MessageEvents.ROUND_FINISHED, () => {
        store.dispatch(getTeamActionAsync());
        store.dispatch(setRoute(Routes.LOBBY));
    });
    socket.on(MessageEvents.QUIZ_ENDED, () => {
        document.title = 'Team';
        store.dispatch(setRoute(Routes.LOGIN));
    });
    socket.on(MessageEvents.QUESTION_CLOSED, () => {
        store.dispatch(getRoundsActionAsync());
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from websocket server.');
    });
}
