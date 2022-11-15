import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toastr from 'toastr';
import NewTeamItem from './NewTeamItem';
import { getQuizTeamsActionAsync } from '../../actions/teamActionCreator';
import Button from '../Button';

function NewTeamsPanel() {
  const dispatch = useDispatch();
  const serverURL = process.env.REACT_APP_API_URL;

  const global = useSelector((state) => state.global);
  const teams = useSelector((state) => state.teams);
  const filteredTeams = teams.filter((team) => team.accepted === false);

  const handleAcceptAll = () => {
    fetch(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/teams`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
    }).then(() => dispatch(getQuizTeamsActionAsync()))
      .catch(() => {
        toastr.error('Er is een fout opgetreden!');
      });
  };

  const handleAccept = (_id) => {
    fetch(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/teams/${_id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
    }).then(() => dispatch(getQuizTeamsActionAsync()))
      .catch(() => {
        toastr.error('Er is een fout opgetreden!');
      });
  };

  const handleDecline = (_id) => {
    fetch(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/teams/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
    }).then(() => dispatch(getQuizTeamsActionAsync()))
      .catch(() => {
        toastr.error('Er is een fout opgetreden!');
      });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl">Nieuwe teams</h1>
        <Button name="Accepteer alle teams" onClick={handleAcceptAll} />
      </div>
      <div className="overflow-y-auto flex-1 rounded-lg border-2 border-gray-200 dark:border-neutral-600 transition-all dark:text-white dark:bg-neutral-700 bg-white">
        {filteredTeams.map((team) => (
          <NewTeamItem
            key={team.name}
            team={team}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        ))}
      </div>
    </div>
  );
}

export default NewTeamsPanel;
