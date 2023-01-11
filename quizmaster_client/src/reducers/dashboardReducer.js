const initialState = {
  connected: false,
  categories: [],
  totalCategoryCount: 0,
  questions: [],
  totalQuestionCount: 0,
  quizzes: [],
  totalQuizCount: 0,
  images: [],
  totalImageCount: 0,
  placeholders: [],
  totalPlaceholderCount: 0,
};

// eslint-disable-next-line default-param-last
export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DASHBOARD_CONNECTED':
      return { ...state, connected: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: [...action.payload] };
    case 'SET_DASHBOARD_QUESTIONS':
      return { ...state, questions: [...action.payload.questions], totalQuestionCount: action.payload.total };
    case 'SET_QUIZZES':
      return { ...state, quizzes: [...action.payload.quizzes], totalQuizCount: action.payload.total };
    case 'SET_IMAGES':
      return { ...state, images: [...action.payload.images], totalImageCount: action.payload.total };
    case 'SET_PLACEHOLDERS':
      return { ...state, placeholders: [...action.payload.placeholders], totalPlaceholderCount: action.payload.total };
    default:
      return {
        ...state,
      };
  }
}
