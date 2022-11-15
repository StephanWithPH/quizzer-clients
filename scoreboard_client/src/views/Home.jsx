import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import { connectScoreboardActionAsync } from '../actions/globalActionCreator';

function Home() {
  const dispatch = useDispatch();

  const [lobbyCode, setLobbyCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lobbyCode) {
      dispatch(connectScoreboardActionAsync(lobbyCode));
      window.history.pushState('', '', `/${lobbyCode}`);
    } else {
      setError('Voeg a.u.b. een lobbyCode in');
    }
  };

  const handleLobbyCodeChange = (e) => {
    setLobbyCode(e.target.value.toUpperCase());
  };

  useEffect(() => {
    if (window.location.pathname.replace('/', '').length === 5) {
      setLobbyCode(window.location.pathname.slice(1).toUpperCase());
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="md:w-[50%] lg:w-[40%] dark:bg-neutral-700 w-full flex justify-center items-center h-30 bg-white rounded-xl shadow">
        <div className="p-10 md:p-20 w-full">
          <div className="text-center">
            <p className="font-bold text-4xl mb-4">Quizzer</p>
            <p>
              Vul de lobbycode in om het scorebord te verbinden met de quiz. Het scorebord zal live bijwerken.
            </p>

            <form className="mt-8" method="POST" onSubmit={handleSubmit}>
              <div className="mb-3">
                <Input styles="w-full" name="lobbyCode" value={lobbyCode} placeholder="Lobby code" onChange={handleLobbyCodeChange} />
              </div>
              <div>
                <Button styles="w-full" type="submit" name="Verbind" />
              </div>
              {error ? <p className="bg-red-400 p-2 my-4 rounded-md text-white text-sm font-medium">{error}</p> : <br />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
