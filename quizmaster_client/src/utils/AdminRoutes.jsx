import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function AdminRoutes() {
  const isAuthenticated = sessionStorage.getItem('token');
  const [isAuth, setIsAuth] = useState();

  const serverURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (isAuthenticated == null) {
      setIsAuth(false);
      return;
    }
    const checkTokenWithIdOnServer = async (token) => {
      const response = await fetch(`${serverURL}/api/v1/manage/validate`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      }).catch(() => {
        toast.error('Er kon geen verbinding gemaakt worden met de server', { position: 'top-right' });
        setIsAuth(false);
      });

      if (!response.ok) {
        document.title = 'Quizmaster';
        sessionStorage.removeItem('token');
      }
      setIsAuth(response);

      return isAuth;
    };

    checkTokenWithIdOnServer(isAuthenticated);
  }, [isAuthenticated]);

  if (isAuth === undefined) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <Loader styles="text-indigo-500 dark:text-indigo-400 w-20 h-20" />
          <h3>Een moment geduld a.u.b.</h3>
        </div>
      </div>
    );
  }

  return (
    isAuth ? <Outlet /> : <Navigate to="/dashboard/login" />
  );
}
export default AdminRoutes;
