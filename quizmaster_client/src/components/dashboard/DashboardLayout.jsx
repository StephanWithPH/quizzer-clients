import React, { useEffect } from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';
import { messageHandler, openWebSocket } from '../../websocket';

function DashboardLayout({ children }) {
  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      openWebSocket(messageHandler);
    }
  }, []);

  return (
    <div className="w-full h-full min-h-screen dark:bg-neutral-900 flex">
      <SideBar />
      <div className="w-full h-full min-h-screen flex flex-col">
        <TopBar />
        <div className="px-10 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
