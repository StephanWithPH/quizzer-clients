const initialState = {
  scoreboardConnected: false,
};

// eslint-disable-next-line default-param-last
export default function scoreboardStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SCOREBOARD_CONNECTED':
      return {
        ...state,
        scoreboardConnected: action.payload,
      };
    default:
      return state;
  }
}
