import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { createQuizActionAsync } from '../actions/globalActionCreator';
import waves from '../assets/waves.svg';

function App() {
  const dispatch = useDispatch();
  const questionsPerRound = process.env.REACT_APP_QUESTIONS_PER_ROUND;

  const handleLogin = () => {
    dispatch(createQuizActionAsync());
  };

  return (
    <div className="h-screen flex transition-all dark:bg-neutral-800 items-center justify-center relative">
      <div className="md:w-[50%] lg:w-[40%] transition-all dark:text-white dark:bg-neutral-700 w-full flex justify-center items-center h-30 bg-white rounded-xl shadow z-10">
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
  );
}

export default App;
