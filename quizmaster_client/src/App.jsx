import React from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './views/Login';
import QuestionOverview from './views/QuestionOverview';
import Lobby from './views/Lobby';
import NextRound from './views/NextRound';
import SelectQuestion from './views/SelectQuestion';
import DarkMode from './components/DarkMode';
import Dashboard from './views/Dashboard';
import DashboardLogin from './views/DashboardLogin';
import AdminRoutes from './utils/AdminRoutes';

toastr.options = {
  progressBar: true,
  maxOpened: 1,
  newestOnTop: true,
  preventDuplicates: true,
  positionClass: 'toast-top-right',
  hideMethod: 'slideUp',
  closeMethod: 'slideUp',
};

function renderRoute(route) {
  switch (route) {
    case 'login':
      return <Login />;
    case 'lobby':
      return <Lobby />;
    case 'nextRound':
      return <NextRound />;
    case 'selectQuestion':
      return <SelectQuestion />;
    case 'questionOverview':
      return <QuestionOverview />;
    default:
      return <Login />;
  }
}

function App() {
  const routeState = useSelector((state) => state.router);
  return (
    <div className="relative bg-gray-100 dark:bg-neutral-800 dark:text-white h-screen">
      <DarkMode />
      { window.location.pathname === '/' ? renderRoute(routeState.currentRoute) : (
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard/login" element={<DashboardLogin />} />
            <Route element={<AdminRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) }

    </div>
  );
}

export default App;
