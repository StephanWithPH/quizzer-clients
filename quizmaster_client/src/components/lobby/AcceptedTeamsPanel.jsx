import React from 'react';
import { useSelector } from 'react-redux';

function AcceptedTeamsPanel() {
  const teams = useSelector((state) => state.teams);
  const filteredTeams = teams.filter((team) => team.accepted === true);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl mb-3">Geaccepteerde teams</h1>
      </div>
      <div className="flex-1 overflow-y-auto h-full rounded-lg rounded
      border-2 border-gray-200 dark:border-neutral-600 transition-all dark:text-white dark:bg-neutral-700 bg-white"
      >
        {filteredTeams.map((team) => (
          <div key={team.name} className="flex items-center justify-between px-4 py-2 transition-all border-b dark:border-neutral-400 border-gray-200">{team.name}</div>
        ))}
      </div>
    </div>

  );
}

export default AcceptedTeamsPanel;
