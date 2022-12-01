const initialState = [];

// eslint-disable-next-line default-param-last
export default function teamReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TEAMS':
      return [...action.payload];
    case 'LOGOUT':
      return [...initialState];
    default:
      return [...state];
  }
}
