import { toast } from 'react-toastify';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function switchMenuAction() {
  return { type: 'SWITCH_MENU' };
}

export function setTotalAmountsAction(totalAmounts) {
  return { type: 'SET_TOTAL_AMOUNTS', payload: { ...totalAmounts } };
}

export function getTotalAmountsActionAsync() {
  return async (dispatch) => {
    const doFetch = fetcher(`${serverURL}/api/v1/manage/totals`, {
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
        error: 'Er is een fout opgetreden met het ophalen van de totalen!',
      },
    ).then((totals) => {
      dispatch(setTotalAmountsAction(totals));
    });
  };
}
