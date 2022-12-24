import React from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';

function DashboardLayout({ children }) {
  return (
    <div className="w-full h-screen dark:bg-neutral-900 flex">
      <SideBar />
      <div className="w-full h-screen flex flex-col">
        <TopBar />
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
