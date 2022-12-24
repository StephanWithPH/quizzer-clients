const initialState = {
  connected: false,
  categories: [],
  questions: [],
  quizzes: [],
  images: [],
};

// eslint-disable-next-line default-param-last
export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DASHBOARD_CONNECTED':
      return { ...state, connected: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: [...action.payload] };
    case 'SET_QUESTIONS':
      return { ...state, questions: [...action.payload] };
    case 'SET_QUIZZES':
      return { ...state, quizzes: [...action.payload] };
    case 'SET_IMAGES':
      return { ...state, images: [...action.payload] };
    default:
      return {
        ...state,
      };
  }
}
