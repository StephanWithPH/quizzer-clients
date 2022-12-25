import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideBarItem(props) {
  const {
    name, to, icon, count,
  } = props;
  const menuOpen = useSelector((state) => state.sidebar.menuOpen);

  const currentPath = window.location.pathname;

  return (
    <Link
      to={`/dashboard/${to}`}
      className={`flex w-full ${menuOpen ? 'justify-between' : 'justify-center'} items-center px-4 p-2 text-base font-normal transition-all
      rounded-lg text-white hover:bg-indigo-300/50 ${currentPath.includes(`/dashboard/${to}`) && 'bg-indigo-300/50'}`}
    >
      <div className="flex">
        {icon}
        {menuOpen && <span className="flex-1 ml-3 text-lg capitalize whitespace-nowrap">{name}</span>}
      </div>
      {menuOpen && (
      <span className={`${currentPath.includes(`/dashboard/${to}`) ? 'bg-white text-indigo-500' : 'text-white'} 
      w-10 h-10 text-sm inline-flex items-center justify-center rounded-full p-2`}
      >
        {count}
      </span>
      )}
    </Link>
  );
}

export default SideBarItem;
