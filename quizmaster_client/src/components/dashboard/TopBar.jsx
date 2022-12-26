import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'react-feather';
import { useSelector } from 'react-redux';
import { messageHandler, openWebSocket } from '../../websocket';

function TopBar() {
  const breadcrumbs = useBreadcrumbs();
  const websocketConnected = useSelector((state) => state.dashboard.connected);

  const handleReconnect = () => {
    openWebSocket(messageHandler);
  };

  return (
    <div className="bg-indigo-500 sticky top-0 flex justify-between items-center text-white border-l-2 border-l-indigo-400/50 px-10 py-5">
      {(breadcrumbs.length > 2) ? (
        <h1 className="flex items-center gap-x-1">
          {breadcrumbs.slice(1).map((breadcrumb, index) => (
            (index === breadcrumbs.length - 2) ? (
              <Link className="text-lg font-medium" key={breadcrumb.key} to={breadcrumb.key}>{breadcrumb.breadcrumb.props.children}</Link>
            ) : (
              <div key={breadcrumb.key} className="flex items-center gap-x-1 text-lg font-medium">
                <Link to={breadcrumb.key}>{breadcrumb.breadcrumb.props.children}</Link>
                <ChevronRight size={16} />
              </div>

            )
          ))}
        </h1>
      ) : (
        <p className="text-lg font-medium">Dashboard</p>
      )}
      {websocketConnected ? (
        <div className="w-7 h-7 relative flex">
          <span className="w-full h-full bg-emerald-500 rounded-full absolute animate-ping duration-1000" />
          <span className="w-full h-full bg-emerald-500 rounded-full" />
        </div>
      ) : (
        <div className="w-7 h-7 relative flex items-center justify-center">
          <button type="button" aria-label="reconnect" onClick={handleReconnect} className="w-full h-full bg-neutral-700 rounded-full" />
        </div>
      )}
    </div>
  );
}

export default TopBar;
