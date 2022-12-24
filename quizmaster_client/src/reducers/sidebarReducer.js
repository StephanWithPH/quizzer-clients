const initialState = {
  menuOpen: true,
  categories: 12,
  questions: 12,
  quizzes: 12,
  images: 12,
};

// eslint-disable-next-line default-param-last
export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case 'SWITCH_MENU':
      return { ...state, menuOpen: !state.menuOpen };
    default:
      return {
        ...state,
      };
  }
}
