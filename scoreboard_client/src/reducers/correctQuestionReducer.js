const initialState = [];

// eslint-disable-next-line default-param-last
export default function correctQuestionReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CORRECT_QUESTIONS':
      return [...action.payload];
    default:
      return [...state];
  }
}
