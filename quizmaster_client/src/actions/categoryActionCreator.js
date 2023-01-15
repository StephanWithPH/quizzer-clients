import { toast } from 'react-toastify';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setCategoriesAction(categories) {
  return {
    type: 'SET_CATEGORIES',
    payload: categories,
  };
}

export function getCategoriesActionAsync() {
  return async (dispatch) => {
    const doFetch = fetcher(`${serverURL}/api/v1/quizmaster/categories`, {}).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });

    await toast.promise(
      doFetch,
      {
        pending: 'Categorieen ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het ophalen van de categorieen!';
          },
        },
      },
    ).then((categories) => {
      dispatch(setCategoriesAction(categories));
    });
  };
}
