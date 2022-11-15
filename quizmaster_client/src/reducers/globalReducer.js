const initialState = {
  lobbyCode: null,
  scoreboardConnected: false,
};

// eslint-disable-next-line default-param-last
export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOBBY_CODE':
      return {
        ...state,
        lobbyCode: action.payload,
      };
    case 'SET_SCOREBOARD_CONNECTED':
      return {
        ...state,
        scoreboardConnected: action.payload,
      };
    default:
      return state;
  }
}
