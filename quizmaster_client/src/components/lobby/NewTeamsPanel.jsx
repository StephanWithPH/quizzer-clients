import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import NewTeamItem from './NewTeamItem';
import { getQuizTeamsActionAsync } from '../../actions/teamActionCreator';
import Button from '../Button';
import fetcher from '../../fetcher';

function NewTeamsPanel() {
  const dispatch = useDispatch();
  const serverURL = process.env.REACT_APP_API_URL;

  const global = useSelector((state) => state.global);
  const teams = useSelector((state) => state.teams);
  const filteredTeams = teams.filter((team) => team.accepted === false);

  const handleAcceptAll = async () => {
    await toast.promise(
      fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/teams`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }

        return res.json();
      }),
      {
        pending: 'Teams worden geaccepteerd...',
        success: 'Alle teams zijn geaccepteerd!',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het accepteren van alle teams!';
          },
        },
      },
    ).then(() => dispatch(getQuizTeamsActionAsync()));
  };

  const handleAccept = async (_id) => {
    await toast.promise(
      fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/teams/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }

        return res.json();
      }),
      {
        pending: 'Team wordt geaccepteerd...',
        success: 'Team is geaccepteerd!',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het accepteren van een team!';
          },
        },
      },
    ).then(() => dispatch(getQuizTeamsActionAsync()));
  };

  const handleDecline = async (_id) => {
    await toast.promise(
      fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${global.lobbyCode}/teams/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => { throw new Error(text); });
        }

        return res.json();
      }),
      {
        pending: 'Team wordt geweigerd...',
        success: 'Team is geweigerd!',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is een fout opgetreden met het weigeren van een team!';
          },
        },
      },
    ).then(() => dispatch(getQuizTeamsActionAsync()));
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
