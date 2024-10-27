import { getQuizTeamsActionAsync } from './actions/teamActionCreator';
import { getRoundsActionAsync } from './actions/roundActionCreator';
import { setScoreboardConnected } from './reducers/scoreboardStateReducer.ts';
import store from './store/store.ts';
import { io, Socket } from 'socket.io-client';

const serverHostname: string = import.meta.env.VITE_WS_URL || 'ws://localhost:4000';

let socket: Socket | undefined;

enum MessageEvents {
    TEAM_JOINED = 'TEAM_JOINED',
    TEAM_ANSWERED = 'TEAM_ANSWERED',
    SCOREBOARD_CONNECTED = 'SCOREBOARD_CONNECTED'
}

export function openWebSocket() {
    socket = io(serverHostname);

    socket.on('connect', () => {
        console.log('Connected to websocket server.');

        socket?.emit('TOKEN', window.sessionStorage.getItem('token'));
    });

    socket.on(MessageEvents.TEAM_JOINED, () => store.dispatch(getQuizTeamsActionAsync()));
    socket.on(MessageEvents.TEAM_ANSWERED, () => store.dispatch(getRoundsActionAsync()));
    socket.on(MessageEvents.SCOREBOARD_CONNECTED, () => store.dispatch(setScoreboardConnected(true)));

    socket.on('disconnect', () => {
        console.log('Disconnected from websocket server.');
    });
}
