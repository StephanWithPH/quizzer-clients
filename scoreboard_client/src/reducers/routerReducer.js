const initialState = {
  currentRoute: 'login',
};

// eslint-disable-next-line default-param-last
export default function routerReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROUTE':
      return {
        ...state,
        currentRoute: action.payload,
      };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}
