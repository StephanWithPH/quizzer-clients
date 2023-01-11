import toastr from 'toastr';
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
    fetcher(`${serverURL}/api/v1/manage/totals`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((totals) => {
      dispatch(setTotalAmountsAction(totals));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden met het ophalen van de totalen!');
    });
  };
}
