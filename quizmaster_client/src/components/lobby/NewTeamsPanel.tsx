import toastr from 'toastr';
import NewTeamItem from './NewTeamItem';
import { getQuizTeamsActionAsync } from '../../actions/teamActionCreator';
import Button from '../Button';
import fetcher from '../../fetcher';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';

function NewTeamsPanel() {
    const dispatch = useAppDispatch();
    const serverURL = import.meta.env.VITE_API_URL;

    const global = useAppSelector((state) => state.global);
    const teams = useAppSelector((state) => state.teams);
    const filteredTeams = teams.filter((team) => !team.accepted);

    const handleAcceptAll = () => {
        fetcher(`${serverURL}/quizMaster/quiz/${global.lobbyCode}/teams`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
            })
            .then(() => dispatch(getQuizTeamsActionAsync()))
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };

    const handleAccept = (_id: string) => {
        fetcher(`${serverURL}/quizMaster/quiz/${global.lobbyCode}/teams/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
            })
            .then(() => dispatch(getQuizTeamsActionAsync()))
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };

    const handleDecline = (_id: string) => {
        fetcher(`${serverURL}/quizMaster/quiz/${global.lobbyCode}/teams/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
            })
            .then(() => dispatch(getQuizTeamsActionAsync()))
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-3">
                <h1 className="text-xl">Nieuwe teams</h1>
                <Button name="Accepteer alle teams" onClick={handleAcceptAll} disabled={filteredTeams.length === 0} />
            </div>
            <div className="overflow-y-auto flex-1 rounded-lg border-2 border-gray-200 dark:border-neutral-600 transition-all dark:text-white dark:bg-neutral-700 bg-white">
                {filteredTeams.map((team) => (
                    <NewTeamItem key={team.name} team={team} onAccept={handleAccept} onDecline={handleDecline} />
                ))}
            </div>
        </div>
    );
}

export default NewTeamsPanel;
