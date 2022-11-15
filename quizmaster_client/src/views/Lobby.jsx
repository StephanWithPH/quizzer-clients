import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toastr from 'toastr';
import AcceptedTeamsPanel from '../components/lobby/AcceptedTeamsPanel';
import Header from '../components/Header';
import Button from '../components/Button';
import NewTeamsPanel from '../components/lobby/NewTeamsPanel';
import changeRouteAction from '../actions/routerActionCreator';
import { getQuizTeamsActionAsync } from '../actions/teamActionCreator';

function Lobby() {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams).filter((team) => team.accepted);
  const { lobbyCode } = useSelector((state) => state.global);
  const minTeams = process.env.REACT_APP_MINIMAL_TEAMS;
  const scoreboardUrl = process.env.REACT_APP_SCOREBOARD_URL;

  useEffect(() => {
    dispatch(getQuizTeamsActionAsync());
  }, []);

  const handleNextClick = () => {
    if (teams.length < minTeams) {
      toastr.error(`Er moeten minimaal ${minTeams} teams zijn om door te gaan.`);
    } else {
      dispatch(changeRouteAction('nextRound'));
    }
  };

  const handleConnectScoreboard = () => {
    window.open(`${scoreboardUrl}/${lobbyCode}`, '_blank');
  };

  return (
    <div className="overflow-hidden h-screen transition-all dark:text-white dark:bg-neutral-800">
      <Header />
      <div className="h-full flex flex-col gap-10 mt-4 mx-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full h-[70vh] overflow-hidden">
          <NewTeamsPanel />
          <AcceptedTeamsPanel />
        </div>
        <div className="flex gap-x-10 justify-between">
          <Button name="Verbind scorebord" onClick={handleConnectScoreboard} />
          <Button name="Volgende" disabled={teams.length < minTeams} onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
}

export default Lobby;
