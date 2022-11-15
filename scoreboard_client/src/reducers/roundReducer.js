const initialState = [];

// eslint-disable-next-line default-param-last
export default function roundReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROUNDS':
      return [...action.payload];
    default:
      return [...state];
  }
}
