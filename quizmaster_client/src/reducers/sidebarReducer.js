const initialState = {
  menuOpen: true,
  categories: 0,
  questions: 0,
  quizzes: 0,
  images: 0,
  placeholders: 0,
};

// eslint-disable-next-line default-param-last
export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case 'SWITCH_MENU':
      return { ...state, menuOpen: !state.menuOpen };
    case 'SET_TOTAL_AMOUNTS':
      return {
        ...state,
        categories: action.payload.categories,
        questions: action.payload.questions,
        quizzes: action.payload.quizzes,
        images: action.payload.images,
        placeholders: action.payload.placeholders,
      };
    default:
      return {
        ...state,
      };
  }
}
