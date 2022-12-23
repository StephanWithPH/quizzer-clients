import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import fetcher from '../fetcher';
import Input from '../components/Input';
import Button from '../components/Button';

const serverURL = process.env.REACT_APP_API_URL;
function DashboardLogin() {
  const passwordField = useRef();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length > 0) {
      fetcher(`${serverURL}/api/v1/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => { throw new Error(text); });
        }

        return res.json();
      }).then((data) => {
        document.title = 'Quizzer - Dashboard';
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }).catch((err) => {
        const message = JSON.parse(err.message).error;
        passwordField.current.classList.add('!ring-red-500');
        setError(message);
      })
        .finally(() => setDisabled(false));
    } else {
      passwordField.current.classList.add('!ring-red-500');
      setError('Vul een wachtwoord in');
    }
  };

  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="h-screen w-full transition-all dark:bg-neutral-900">

      <button
        onClick={handleGoBack}
        type="button"
        className="absolute ring-2 ring-offset-4 ring-offset-neutral-800 hover:bg-indigo-400 ring-indigo-500
        overflow-hidden transition-all hover:ring-indigo-400 bg-indigo-500 p-4 rounded-b-full top-0 left-1/2 -translate-x-1/2"
      >
        <ArrowLeft className="relative transition-all" strokeWidth={2} />
      </button>

      <div className="h-full w-full flex items-center justify-center">
        <div className="md:w-1/2 lg:w-5/12 transition-all dark:text-white dark:bg-neutral-800 w-full flex justify-center items-center h-30 bg-white rounded-xl shadow z-10">
          <div className="p-10 md:p-20 w-full">
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold text-4xl mb-4">Quizzer Dashboard</p>
              <p>
                Vul hieronder het wachtwoord in om toegang te krijgen tot het dashboard.
              </p>
              <form className="mt-8 w-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <div className="mb-3 w-full flex justify-center">
                  <Input
                    reference={passwordField}
                    name="wachtwoord"
                    styles="w-full lg:w-1/2"
                    value={password}
                    placeholder="Wachtwoord"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p className={`text-red-400 p-2 rounded-md text-sm font-medium mb-3 ${error ? 'visible' : 'invisible'}`}>{error || 'Geen problemen'}</p>
                <Button disabled={disabled} styles="px-4" type="submit" name="Aanmelden" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLogin;
