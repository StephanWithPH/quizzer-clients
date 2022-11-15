import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Check, Copy } from 'react-feather';

function Header() {
  const { lobbyCode } = useSelector((state) => state.global);
  const rounds = useSelector((state) => state.rounds);
  const { scoreboardConnected } = useSelector((state) => state.scoreboardState);

  const questionsPerRound = process.env.REACT_APP_QUESTIONS_PER_ROUND;

  const [isCopied, setIsCopied] = useState(false);

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

  return (
    <header className="w-full px-20 bg-white transition-all dark:text-white dark:bg-neutral-900 py-3 border-b-2 dark:border-b-neutral-600 flex justify-between items-center">
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
                {`${rounds[rounds.length - 1].askedQuestions.length}/${questionsPerRound}`}
              </span>
            </p>
          )}
      </div>
      {
        scoreboardConnected
          ? (
            <div className="flex h-5 w-5 relative">
              <span className="[animation-duration:2.5s] animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-100" />
              <span className="relative inline-flex rounded-full h-full w-full bg-green-400" />
            </div>
          )
          : (
            <div className="flex h-5 w-5 relative">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-100" />
            </div>
          )
      }

    </header>
  );
}

export default Header;
