import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Copy, LogOut } from 'react-feather';
import changeRouteAction from '../actions/routerActionCreator';
import { logoutAction } from '../actions/globalActionCreator';

function Header() {
  const dispatch = useDispatch();
  const [isCopied, setIsCopied] = useState(false);
  const { lobbyCode } = useSelector((state) => state.global);
  const rounds = useSelector((state) => state.rounds);
  const maxQuestionsPerRound = process.env.REACT_APP_QUESTIONS_PER_ROUND;

  useEffect(() => {
    if (isCopied) {
      navigator.clipboard.writeText(lobbyCode)
        .then(() => {
          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        });
    }
  }, [isCopied]);

  const handleExit = () => {
    document.title = 'Scoreboard';
    dispatch(logoutAction());
    dispatch(changeRouteAction('login'));
  };

  return (
    <header className="sticky top-0 w-full z-30 px-20 dark:bg-neutral-900 dark:border-neutral-600 transition-all bg-white py-3 border-b-2 flex justify-between items-center">
      <div className="flex justify-center items-center gap-x-4 text-lg">
        <button
          type="button"
          onClick={() => setIsCopied(true)}
          className="relative group outline-none inline-flex gap-x-2 items-center bg-indigo-500 text-white p-2 rounded-xl"
        >
          <Copy
            className={`absolute ${!isCopied && 'group-hover:opacity-100'} opacity-0 transition-all -left-8 text-indigo-300`}
          />
          <Check
            className={`absolute ${isCopied ? 'opacity-100' : 'opacity-0'} transition-all -left-8 text-green-500`}
          />
          {lobbyCode}
        </button>
        {rounds.length > 0 && (
          <p className="inline-flex gap-x-2 items-center">
            Ronde:
            <span
              className="bg-indigo-500 rounded-full w-12 h-12 text-sm flex justify-center items-center text-white"
            >
              {rounds.length}
            </span>
          </p>
        )}
        {rounds.length > 0
          && rounds[rounds.length - 1].askedQuestions
          && rounds[rounds.length - 1].askedQuestions.length > 0
          && (
            <p className="inline-flex gap-x-2 items-center">
              Vraag:
              <span
                className="bg-indigo-500 rounded-full w-12 h-12 text-sm flex justify-center items-center text-white"
              >
                {`${rounds[rounds.length - 1].askedQuestions.length}/${maxQuestionsPerRound}`}
              </span>
            </p>
          )}
      </div>
      <div className="flex items-center gap-x-7">
        <button onClick={() => handleExit()}>
          <LogOut className="text-indigo-500" strokeWidth={2} size={25} />
        </button>
      </div>
    </header>
  );
}

export default Header;
