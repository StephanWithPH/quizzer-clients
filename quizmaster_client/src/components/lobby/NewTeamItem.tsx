import { Check, X } from 'react-feather';
import Team from "../../models/team.ts";

interface NewTeamItemProps {
    team: Team;
    onAccept: (teamId: string) => void;
    onDecline: (teamId: string) => void;
}

function NewTeamItem({ team, onAccept, onDecline }: NewTeamItemProps) {
  return (
    <div className="flex p-2 justify-between border-b dark:border-neutral-400 transition-all border-gray-200">
      <h2>{ team.name }</h2>
      <div className="flex">
        <button type="button" onClick={() => onAccept(team._id)} aria-label="accept">
          <Check className="text-green-500 hover:text-green-700" />
        </button>
        <X onClick={() => onDecline(team._id)} className="text-red-500 hover:text-red-700" />
      </div>
    </div>
  );
}

export default NewTeamItem;
