const initialState = {
  answer: '',
  givenAnswer: '',
};

// eslint-disable-next-line default-param-last
export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answer: action.payload,
      };
    case 'SET_GIVEN_ANSWER':
      return {
        ...state,
        givenAnswer: action.payload,
      };
    case 'CLEAR_QUESTION':
      return initialState;
    default:
      return state;
  }
}
