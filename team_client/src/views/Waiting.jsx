import React from 'react';
import Clock from '../components/Clock';
import Header from '../components/Header';

function Waiting() {
  return (
    <div className="h-screen overflow-hidden">
      <Header hideLobbyCode />
      <div className="flex flex-col gap-y-10 items-center justify-center h-full">
        <div className="h-[96px] w-[96px]">
          <Clock />
        </div>
        <p className="font-bold text-xl">Wacht op acceptatie</p>
      </div>
    </div>
  );
}

export default Waiting;
