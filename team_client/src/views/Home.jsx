import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Camera from 'react-html5-camera-photo';
import { X } from 'react-feather';
import toastr from 'toastr';
import Input from '../components/Input';
import Button from '../components/Button';
import { addTeamToQuizActionAsync } from '../actions/globalActionCreator';
import 'react-html5-camera-photo/build/css/index.css';

function Home() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const [dataUri, setDataUri] = useState('');
  const [userWantsPicture, setUserWantsPicture] = useState(false);

  const [error, setError] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (window.location.pathname.replace('/', '').length === 5) {
      setLobbyCode(window.location.pathname.slice(1).toUpperCase());
    }
  }, []);

  const handleTeamChange = (e) => {
    if (e.target.value.length > 30) {
      e.target.classList.add('!ring-red-500');
      setName(name);
    } else {
      e.target.classList.remove('!ring-red-500');
      setName(e.target.value);
    }
  };

  const handleLobbyCodeChange = (e) => {
    setLobbyCode(e.target.value.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && lobbyCode) {
      setSubmitDisabled(true);
      await dispatch(addTeamToQuizActionAsync(lobbyCode, name, dataUri));
      window.history.pushState('', '', `/${lobbyCode}`);
      setSubmitDisabled(false);
    } else {
      setError('Voeg a.u.b. een teamnaam en een lobbyCode in');
    }
  };

  const handleCameraError = () => {
    setUserWantsPicture(false);
    toastr.error('Oeps, weet je zeker dat je toestemming hebt verleend om je camera te gebruiken? Controleer dit in de browserinstellingen.');
  };

  function handleTakePhotoAnimationDone(uri) {
    setDataUri(uri);
  }

  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="md:w-[50%] lg:w-[40%] w-full flex justify-center items-center h-30 dark:bg-neutral-700 bg-white rounded shadow">
        <div className="p-10 md:p-20 w-full">
          <div className="text-center">
            <p className="font-bold text-4xl mb-4">Quizzer</p>
            <p>
              Welkom bij de quizzer.
              Wacht totdat de quizmaster de lobbycode heeft gegeven en vul deze dan hieronder in,
              samen met een teamnaam. Bij het spelen van de quiz zul je open antwoorden moeten geven
              op kennisvragen en na elke ronde krijgt de top 3 van de ronde punten toegekend.
              Succes, en vergeet geen leuke foto toe te voegen voordat je op &apos;join&apos; klikt!
            </p>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="mb-3">
                <Input styles="w-full" name="teamnaam" value={name} placeholder="Teamnaam" onChange={handleTeamChange} />
              </div>
              <div className="mb-3">
                <Input
                  name="lobbyCode"
                  styles="w-full"
                  value={lobbyCode}
                  placeholder="Lobby code"
                  onChange={handleLobbyCodeChange}
                />
              </div>
              {error
                ? <p className="bg-red-400 p-2 rounded-md text-white text-sm font-medium mb-3">{error}</p>
                : <br />}
              <Button disabled={dataUri} onClick={() => setUserWantsPicture(true)} styles="w-full mb-4" type="button" name="Maak team foto" />
              <Button disabled={submitDisabled} styles="w-full" type="submit" name="Join" />
              {
                dataUri && (
                  <p className="mt-3">
                    <span className="font-bold">Let op: </span>
                    De genomen foto zal worden verzonden naar de server!
                  </p>
                )
              }
            </form>
          </div>
        </div>
      </div>
      {
        !dataUri && userWantsPicture && (
          <div className="absolute w-screen h-screen">
            <div className="relative">
              <Camera
                onTakePhotoAnimationDone={(uri) => (handleTakePhotoAnimationDone(uri))}
                onCameraError={() => handleCameraError()}
                isFullscreen
              />
              <div className="absolute right-4 top-4">
                <X size={24} onClick={() => setUserWantsPicture(false)} className="text-white hover:text-gray-200" />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Home;
