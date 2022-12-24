import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideBarItem(props) {
  const {
    name, to, icon,
  } = props;
  const menuOpen = useSelector((state) => state.sidebar.menuOpen);

  const currentPath = window.location.pathname;

  return (
    <Link
      to={`/dashboard/${to}`}
      className={`flex w-full justify-center items-center px-4 p-2 text-base font-normal transition-all
      rounded-lg text-white hover:bg-indigo-300/50 ${currentPath === `/dashboard/${to}` && 'bg-indigo-300/50'}`}
    >
      {icon}
      {menuOpen && <span className="flex-1 ml-3 text-lg capitalize whitespace-nowrap">{name}</span>}
    </Link>
  );
}

export default SideBarItem;
