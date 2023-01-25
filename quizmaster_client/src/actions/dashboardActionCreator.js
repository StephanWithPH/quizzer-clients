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
    const doFetch = fetcher(`${serverURL}/api/v1/manage/categories?page=${page}&perPage=${perPage}${search && `&search=${search}`}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => { throw new Error(text); });
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Categorieen ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het ophalen van categorieen!';
          },
        },
      },
    ).then((data) => {
      dispatch(setCategoriesAction(data));
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
    const doFetch = fetcher(`${serverURL}/api/v1/manage/questions?page=${page}&perPage=${perPage}${search && `&search=${search}`}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => { throw new Error(text); });
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Vragen ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het ophalen van de vragen!';
          },
        },
      },
    ).then((data) => {
      dispatch(setQuestionsAction(data));
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
    const doFetch = fetcher(`${serverURL}/api/v1/manage/quizzes?page=${page}&perPage=${perPage}${search && `&search=${search}`}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Quizzen ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het ophalen van de quizzen!';
          },
        },
      },
    ).then((data) => {
      dispatch(setQuizzesAction(data));
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
    const doFetch = fetcher(`${serverURL}/api/v1/manage/images?offset=${offset}&limit=${limit}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Afbeeldingen ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het ophalen van de afbeeldingen!';
          },
        },
      },
    ).then((images) => {
      dispatch(setImagesAction(images));
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
    const doFetch = fetcher(`${serverURL}/api/v1/manage/images/placeholder?offset=${offset}&limit=${limit}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Placeholders ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het ophalen van de placeholders!';
          },
        },
      },
    ).then((data) => {
      dispatch(setPlaceholderImagesAction(data));
    });
  };
}
