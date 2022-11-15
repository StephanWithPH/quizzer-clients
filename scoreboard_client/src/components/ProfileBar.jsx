import React from 'react';
import { User } from 'react-feather';

function ProfileBar(props) {
  const { teams } = props;
  const serverURL = process.env.REACT_APP_API_URL;
  const teamsToShow = 5;

  return (
    <div className="fixed justify-center dark:bg-neutral-900 dark:border-neutral-400 justify-self-end w-full gap-y-7 max-w-[8rem] hidden xl:flex
    h-screen flex-col right-0 top-0 bg-white p-4 border-l-2 overflow-hidden flex-col"
    >
      {teams.slice(0, teamsToShow).map((team, index) => (
        <div key={team.name} className="relative flex flex-col items-center justify-center gap-y-1">
          <div className="absolute bg-violet-500 rounded-full text-white text-xs h-6 w-6 flex items-center justify-center -top-1 left-2">
            #
            {index + 1}
          </div>
          <div className="rounded-full w-12 h-12 overflow-hidden ring-2 ring-offset-2 ring-indigo-600">
            {team.image ? (
              <img className="w-full h-full object-cover object-center" src={`${serverURL}${team.image}`} alt={team.name} />
            ) : (
              <div className="w-full h-full bg-indigo-500 flex items-center justify-center">
                <User className="text-white" />
              </div>
            )}
          </div>
          <p className="w-10 whitespace-nowrap text-center overflow-hidden text-ellipsis">{team.name}</p>
        </div>
      ))}
      {teams.length > teamsToShow && (
        <div className="relative flex flex-col items-center justify-center gap-y-1 mt-2">
          { teams.length - teamsToShow >= 3 && (
            <div className="absolute z-10 opacity-25 -top-4 rounded-full w-12 h-12 overflow-hidden ring-2 ring-offset-2 ring-indigo-600">
              <div className="w-full h-full bg-indigo-500 text-white flex items-center justify-center" />
            </div>
          )}
          { teams.length - teamsToShow >= 2 && (
          <div className="absolute z-20 opacity-50 -top-2 rounded-full w-12 h-12 overflow-hidden ring-2 ring-offset-2 ring-indigo-600">
            <div className="w-full h-full bg-indigo-500 text-white flex items-center justify-center" />
          </div>
          )}
          <div className="z-30 rounded-full w-12 h-12 overflow-hidden ring-2 ring-offset-2 ring-indigo-600">
            <div className="w-full h-full bg-indigo-500 text-white flex items-center justify-center">
              {`+${teams.length - teamsToShow}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileBar;
