const initialState = {
  lobbyCode: null,
  roundNumber: 0,
  questionNumber: 0,
};

// eslint-disable-next-line default-param-last
export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOBBY_CODE':
      return {
        ...state,
        lobbyCode: action.payload,
      };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}
