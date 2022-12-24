import React from 'react';
import {
  ArrowLeft, Camera, CheckSquare, Grid, HelpCircle, Power,
} from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SideBarItem from './SideBarItem';
import switchMenuAction from '../../actions/menuOpenActionCreator';

const defaultIconSize = 30;
const defaultIconStyle = '';
function SideBar() {
  const menuOpen = useSelector((state) => state.sidebar.menuOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/dashboard/login');
  };

  return (
    <aside className={`${menuOpen ? 'w-64' : 'w-28'} transition-all h-full relative`} aria-label="Sidebar">
      <div className="h-full py-4 px-3 bg-indigo-500 flex flex-col items-center justify-between gap-y-2">
        <div className="w-full flex flex-col gap-y-4">
          <div className="my-4 w-full text-center ">
            <Link
              to="/dashboard"
              className="font-bold text-white text-2xl rounded-full w-full px-4 p-2"
            >
              {menuOpen ? 'Quizzer' : 'QD'}
            </Link>
          </div>
          <SideBarItem icon={<CheckSquare className={defaultIconStyle} size={defaultIconSize} />} to="vragen" name="vragen" />
          <SideBarItem icon={<Grid className={defaultIconStyle} size={defaultIconSize} />} to="categorieen" name="categorieen" />
          <SideBarItem icon={<HelpCircle className={defaultIconStyle} size={defaultIconSize} />} to="quizzes" name="quizzes" />
          <SideBarItem icon={<Camera className={defaultIconStyle} size={defaultIconSize} />} to="afbeeldingen" name="afbeeldingen" />
        </div>
        <div className="flex flex-col gap-y-2 my-2 group hover:bg-indigo-400 transition-all w-10 h-10 rounded-full items-center justify-center">
          <Power className="text-white w-8 h-8 group-hover:w-6 group-hover:h-6 transition-all cursor-pointer" onClick={handleLogout} />
        </div>
      </div>
      <button
        onClick={() => dispatch(switchMenuAction())}
        type="button"
        className="absolute text-white bottom-16 -right-4 p-2 bg-indigo-500 ring-2 ring-indigo-500 ring-offset-2 w-fit rounded-full"
      >
        <ArrowLeft className={`${!menuOpen && 'rotate-180'} transition-all`} />
      </button>
    </aside>
  );
}

export default SideBar;
