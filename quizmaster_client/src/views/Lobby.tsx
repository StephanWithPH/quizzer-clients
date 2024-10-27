import { useEffect } from 'react';
import toastr from 'toastr';
import AcceptedTeamsPanel from '../components/lobby/AcceptedTeamsPanel';
import Header from '../components/Header';
import Button from '../components/Button';
import NewTeamsPanel from '../components/lobby/NewTeamsPanel';
import { getQuizTeamsActionAsync } from '../actions/teamActionCreator';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { setRoute } from '../reducers/routerReducer.ts';
import { Routes } from '../enums/routes.ts';

function Lobby() {
    const dispatch = useAppDispatch();
    const teams = useAppSelector((state) => state.teams).filter((team) => team.accepted);
    const { lobbyCode } = useAppSelector((state) => state.global);
    const minTeams = import.meta.env.VITE_MINIMAL_TEAMS;
    const scoreboardUrl = import.meta.env.VITE_SCOREBOARD_URL;

    useEffect(() => {
        dispatch(getQuizTeamsActionAsync());
    }, [dispatch]);

    const handleNextClick = () => {
        if (teams.length < minTeams) {
            toastr.error(`Er moeten minimaal ${minTeams} teams zijn om door te gaan.`);
        } else {
            dispatch(setRoute(Routes.NEXT_ROUND));
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
