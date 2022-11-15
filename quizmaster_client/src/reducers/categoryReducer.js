const initialState = [];

// eslint-disable-next-line default-param-last
export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return [
        ...action.payload,
      ];
    default:
      return [
        ...state,
      ];
  }
}
