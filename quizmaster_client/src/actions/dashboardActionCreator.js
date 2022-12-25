import toastr from 'toastr';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setDashboardConnectedAction(connected) {
  return {
    type: 'SET_DASHBOARD_CONNECTED',
    payload: connected,
  };
}

export function setCategoriesAction(categories) {
  return {
    type: 'SET_CATEGORIES',
    payload: categories,
  };
}

export function getCategoriesActionAsync() {
  return async (dispatch) => {
    fetcher(`${serverURL}/api/v1/admin/categories`, {
      credentials: 'include',
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

export function setQuestionsAction(data) {
  return {
    type: 'SET_DASHBOARD_QUESTIONS',
    payload: { questions: data.questions, total: data.total },
  };
}

export function getQuestionsActionAsync(search, page, perPage = 10) {
  return async (dispatch) => {
    fetcher(`${serverURL}/api/v1/admin/questions?page=${page}&perPage=${perPage}${search && `&search=${search}`}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((data) => {
      dispatch(setQuestionsAction(data));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };
}

export function setQuizzesAction(quizzes) {
  return {
    type: 'SET_QUIZZES',
    payload: quizzes,
  };
}

export function getQuizzesActionAsync() {
  return async (dispatch) => {
    fetcher(`${serverURL}/api/v1/admin/quizzes`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((quizzes) => {
      dispatch(setQuizzesAction(quizzes));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };
}

export function setImagesAction(images) {
  return {
    type: 'SET_IMAGES',
    payload: images,
  };
}

export function getImagesActionAsync() {
  return async (dispatch) => {
    fetcher(`${serverURL}/api/v1/admin/images`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((images) => {
      dispatch(setImagesAction(images));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };
}
