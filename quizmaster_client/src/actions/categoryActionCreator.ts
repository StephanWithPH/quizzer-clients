import toastr from 'toastr';
import fetcher from '../fetcher';
import { AppDispatch } from '../store/store.ts';
import { setCategories } from '../reducers/categoryReducer.ts';

const serverURL = import.meta.env.VITE_API_URL;

export function getCategoriesActionAsync() {
    return (dispatch: AppDispatch) => {
        fetcher(`${serverURL}/quizMaster/quiz/categories`, {})
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
                return res.json();
            })
            .then((categories) => {
                dispatch(setCategories(categories));
            })
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };
}
