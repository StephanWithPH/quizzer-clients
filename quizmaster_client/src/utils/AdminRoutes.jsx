import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
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

  if (isAuth === undefined) return <Loader styles="text-indigo-500 dark:text-indigo-400" />;

  return (
    isAuth ? <Outlet /> : <Navigate to="/dashboard/login" />
  );
}
export default AdminRoutes;
