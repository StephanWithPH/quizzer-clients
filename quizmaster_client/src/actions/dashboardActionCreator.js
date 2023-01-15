import { toast } from 'react-toastify';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setDashboardConnectedAction(connected) {
  return {
    type: 'SET_DASHBOARD_CONNECTED',
    payload: connected,
  };
}

export function setCategoriesAction(data) {
  return {
    type: 'SET_DASHBOARD_CATEGORIES',
    payload: { categories: data.categories, total: data.total },
  };
}

export function getCategoriesActionAsync(search = '', page = 1, perPage = 10) {
  return async (dispatch) => {
    fetcher(`${serverURL}/api/v1/manage/categories?page=${page}&perPage=${perPage}${search && `&search=${search}`}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((data) => {
      dispatch(setCategoriesAction(data));
    }).catch(() => {
      toast.error('Er is een fout opgetreden met het ophalen van categorieen!');
    });
  };
}

export function setQuestionsAction(data) {
  return {
    type: 'SET_DASHBOARD_QUESTIONS',
    payload: { questions: data.questions, total: data.total },
  };
}

export function getQuestionsActionAsync(search = '', page = 1, perPage = 10) {
  return async (dispatch) => {
    fetcher(`${serverURL}/api/v1/manage/questions?page=${page}&perPage=${perPage}${search && `&search=${search}`}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((data) => {
      dispatch(setQuestionsAction(data));
    }).catch(() => {
      toast.error('Er is een fout opgetreden met het ophalen van de vragen!');
    });
  };
}

export function setQuizzesAction(data) {
  return {
    type: 'SET_QUIZZES',
    payload: { quizzes: data.quizzes, total: data.total },
  };
}

export function getQuizzesActionAsync(search = '', page = 1, perPage = 12) {
  return async (dispatch) => {
    fetcher(`${serverURL}/api/v1/manage/quizzes?page=${page}&perPage=${perPage}${search && `&search=${search}`}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((data) => {
      dispatch(setQuizzesAction(data));
    }).catch(() => {
      toast.error('Er is een fout opgetreden met het ophalen van de quizzen!');
    });
  };
}

export function setImagesAction(data) {
  return {
    type: 'SET_IMAGES',
    payload: { images: data.images, total: data.total },
  };
}

export function getImagesActionAsync(offset = 1, limit = 12) {
  return async (dispatch) => {
    fetcher(`${serverURL}/api/v1/manage/images?offset=${offset}&limit=${limit}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((images) => {
      dispatch(setImagesAction(images));
    }).catch(() => {
      toast.error('Er is een fout opgetreden met het ophalen van de afbeeldingen!');
    });
  };
}

export function setPlaceholderImagesAction(data) {
  return {
    type: 'SET_PLACEHOLDERS',
    payload: { placeholders: data.placeholders, total: data.total },
  };
}

export function getPlaceholderImagesActionAsync(offset = 1, limit = 12) {
  return async (dispatch) => {
    fetcher(`${serverURL}/api/v1/manage/images/placeholder?offset=${offset}&limit=${limit}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((data) => {
      dispatch(setPlaceholderImagesAction(data));
    }).catch(() => {
      toast.error('Er is een fout opgetreden met het ophalen van de placeholders!');
    });
  };
}
