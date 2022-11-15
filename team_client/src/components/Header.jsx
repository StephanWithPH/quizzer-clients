import React from 'react';
import { useSelector } from 'react-redux';

function Header(props) {
  const { hideLobbyCode } = props;
  const teamName = useSelector((state) => state.team.name);
  const lobbyCode = useSelector((state) => state.global.lobbyCode);
  return (
    <header className="w-full bg-white dark:bg-neutral-900 dark:border-neutral-600 transition-all px-3 py-3 border-b-2 flex justify-between items-center">
      <p className="bg-indigo-500 rounded-xl text-white text-base p-2">{teamName}</p>
      {!hideLobbyCode && <p className="bg-indigo-500 rounded-xl text-white text-base p-2">{lobbyCode}</p>}
    </header>
  );
}

export default Header;
