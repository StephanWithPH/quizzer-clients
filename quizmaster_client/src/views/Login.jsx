import React from 'react';
import { useDispatch } from 'react-redux';
import { Key } from 'react-feather';
import Button from '../components/Button';
import { createQuizActionAsync } from '../actions/globalActionCreator';
import waves from '../assets/waves.svg';

function App() {
  const dispatch = useDispatch();
  const questionsPerRound = process.env.REACT_APP_QUESTIONS_PER_ROUND;

  const handleLogin = () => {
    dispatch(createQuizActionAsync());
  };

  const handleOpenDashboard = () => {
    window.location.href = '/dashboard/login';
  };

  return (
    <div className="h-screen w-full transition-all dark:bg-neutral-800">

      <button
        onClick={handleOpenDashboard}
        type="button"
        className="absolute ring-2 ring-offset-4 dark:ring-offset-neutral-800 hover:bg-indigo-400 ring-indigo-500
        overflow-hidden transition-all hover:ring-indigo-400 bg-indigo-500 p-4 rounded-b-full group top-0 left-1/2 -translate-x-1/2"
      >
        <Key className="group-hover:rotate-45 text-white relative delay-100 transition-all" strokeWidth={2} />
      </button>

      <div className="h-full w-full flex items-center justify-center">
        <div className="md:w-1/2 lg:w-5/12 transition-all dark:text-white dark:bg-neutral-700 w-full flex justify-center items-center h-30 bg-white rounded-xl shadow z-10">
          <div className="p-10 md:p-20 w-full">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Quizzer</h1>
              <p>
                Welkom bij de quizzer. Klik op de onderstaande knop om een nieuwe quiz te starten!
                De quiz zal bestaan uit rondes met
                {' '}
                {questionsPerRound}
                {' '}
                vragen. Aan de start van elke ronde kun je een aantal
                categorieën kiezen. Daarna kun je een vraag kiezen om te stellen aan de teams.
              </p>
              <Button styles="w-full mt-8" name="Start nieuwe quiz" onClick={handleLogin} />
            </div>
          </div>
        </div>
        <img className="absolute bottom-0 left-0 w-full z-0" alt="Waves as background on login screen" src={waves} />
      </div>
    </div>
  );
}

export default App;
