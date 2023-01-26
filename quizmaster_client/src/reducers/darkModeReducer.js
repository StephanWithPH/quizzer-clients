const initialState = false;

// eslint-disable-next-line default-param-last
export default function darkModeReducer(state = initialState, action) {
  switch (action.type) {
    case 'SWITCH_DARK_MODE':
      return !state;
    default:
      return state;
  }
}
