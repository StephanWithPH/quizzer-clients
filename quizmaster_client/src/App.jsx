import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './views/Login';
import QuestionOverview from './views/QuestionOverview';
import Lobby from './views/Lobby';
import NextRound from './views/NextRound';
import SelectQuestion from './views/SelectQuestion';
import DarkMode from './components/DarkMode';
import Dashboard from './views/Dashboard/Dashboard';
import DashboardLogin from './views/Dashboard/DashboardLogin';
import AdminRoutes from './utils/AdminRoutes';
import Questions from './views/Dashboard/Questions';
import EditQuestion from './views/Dashboard/EditQuestion';
import Images from './views/Dashboard/Images';
import Placeholders from './views/Dashboard/Placeholders';
import Categories from './views/Dashboard/Categories';
import EditCategory from './views/Dashboard/EditCategory';
import Quizzes from './views/Dashboard/Quizzes';
import ViewQuiz from './views/Dashboard/ViewQuiz';
import NotFound from './views/Dashboard/NotFound';

import 'react-toastify/dist/ReactToastify.css';

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
    <div className="relative bg-gray-100 dark:bg-neutral-800 dark:text-white h-full min-h-screen">
      <DarkMode />

      <ToastContainer
        position="top-center"
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        pauseOnFocusLoss={false}
      />

      { window.location.pathname === '/' ? renderRoute(routeState.currentRoute) : (
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard/login" element={<DashboardLogin />} />
            <Route element={<AdminRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="*" element={<NotFound />} />

              <Route path="/dashboard/vragen" element={<Questions />} />
              <Route path="/dashboard/vragen/:id" element={<EditQuestion />} />

              <Route path="/dashboard/categorieen" element={<Categories />} />
              <Route path="/dashboard/categorieen/:id" element={<EditCategory />} />

              <Route path="/dashboard/quizzen" element={<Quizzes />} />
              <Route path="/dashboard/quizzen/:id" element={<ViewQuiz />} />

              <Route path="/dashboard/afbeeldingen" element={<Images />} />
              <Route path="/dashboard/placeholders" element={<Placeholders />} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) }

    </div>
  );
}

export default App;
