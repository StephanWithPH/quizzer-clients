const initialState = [];

// eslint-disable-next-line default-param-last
export default function correctQuestionReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CORRECT_QUESTIONS':
      return [...action.payload];
    case 'LOGOUT':
      return [...initialState];
    default:
      return [...state];
  }
}
