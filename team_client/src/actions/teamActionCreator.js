import toastr from 'toastr';
import fetcher from '../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

export function setTeamAction(team) {
  return {
    type: 'SET_TEAM',
    payload: team,
  };
}

export function getTeamActionAsync() {
  return (dispatch, getState) => {
    const { global } = getState();
    const { team } = getState();
    fetcher(`${serverURL}/api/v1/team/quizzes/${global.lobbyCode}/teams/${team._id}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    }).then((resJson) => {
      dispatch(setTeamAction(resJson));
    }).catch(() => {
      toastr.error('Er is een fout opgetreden met het ophalen van de teams!');
    });
  };
}
