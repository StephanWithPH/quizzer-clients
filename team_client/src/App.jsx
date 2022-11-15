import React from 'react';
import { useSelector } from 'react-redux';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Home from './views/Home';
import Waiting from './views/Waiting';
import Rejected from './views/Rejected';
import Lobby from './views/Lobby';
import Question from './views/Question';
import DarkMode from './components/DarkMode';

toastr.options = {
  progressBar: true,
  maxOpened: 1,
  newestOnTop: true,
  preventDuplicates: true,
  positionClass: 'toast-top-center',
  hideMethod: 'slideUp',
  closeMethod: 'slideUp',
};

function renderRoute(route) {
  switch (route) {
    case 'login':
      return <Home />;
    case 'lobby':
      return <Lobby />;
    case 'waiting':
      return <Waiting />;
    case 'rejected':
      return <Rejected />;
    case 'question':
      return <Question />;
    default:
      return <Home />;
  }
}

function App() {
  const routeState = useSelector((state) => state.router);
  return (
    <div className="min-h-screen bg-gray-100 transition-all dark:bg-neutral-800 dark:text-white">
      <DarkMode />
      { renderRoute(routeState.currentRoute) }
    </div>
  );
}

export default App;
