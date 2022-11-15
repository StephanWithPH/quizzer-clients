import React from 'react';
import { X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import changeRouteAction from '../actions/routerActionCreator';

function Rejected() {
  const dispatch = useDispatch();
  const { lobbyCode } = useSelector((state) => state.global);
  const handleClick = () => {
    window.history.pushState('', '', `/${lobbyCode}`);
    dispatch(changeRouteAction('home'));
  };

  return (
    <div className="h-screen flex flex-col gap-y-10 items-center justify-center">
      <X size={92} strokeWidth={3} className="text-6xl text-red-500" />
      <p className="font-bold text-xl">Geweigerd</p>
      <Button styles="w-1/2" onClick={handleClick} name="Terug" />
    </div>
  );
}

export default Rejected;
