import toastr from 'toastr';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setCategoriesAction(categories) {
  return {
    type: 'SET_CATEGORIES',
    payload: categories,
  };
}

export function getCategoriesActionAsync() {
  return (dispatch) => {
    fetcher(`${serverURL}/api/v1/quizmaster/categories`, {
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((categories) => {
      dispatch(setCategoriesAction(categories));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };
}
