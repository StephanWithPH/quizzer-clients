const initialState = [];

// eslint-disable-next-line default-param-last
export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return [
        ...action.payload,
      ];
    default:
      return [...state];
  }
}
