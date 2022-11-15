import React from 'react';
import { useSelector } from 'react-redux';
import { Lock, Unlock } from 'react-feather';
import Header from '../components/Header';
import ScoreboardTable from '../components/ScoreboardTable';
import ProfileBar from '../components/ProfileBar';

function Scoreboard() {
  const teamUrl = process.env.REACT_APP_TEAM_URL;
  const { lobbyCode } = useSelector((state) => state.global);
  const teams = useSelector((state) => state.teams).sort((a, b) => b.roundPoints - a.roundPoints);
  const rounds = useSelector((state) => state.rounds);
  const round = rounds[rounds.length - 1];

  let askedQuestion;
  if (round) {
    askedQuestion = round.askedQuestions[round.askedQuestions.length - 1];
  }

  return (
    <div className="h-full h-full flex flex-col">
      <Header />
      <div className="grid grid-cols-12 flex-1 relative">
        <div className={`flex pt-5 relative flex-col gap-y-2 px-24 xl:pl-24 xl:pr-6 min-h-[90vh] 
        ${teams && teams.length > 0 ? 'col-span-12 xl:col-span-11' : 'col-span-12'}`}
        >
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-5 min-h-[4rem] justify-center h-full items-center rounded-full overflow-hidden items-center">
                {askedQuestion ? (
                  <>
                    <div className="font-bold col-span-5 lg:col-span-4 overflow-hidden h-full flex items-center
                  bg-gradient-to-r from-indigo-500 to-violet-500 border-r-none lg:border-r-2 text-2xl px-8 py-2 bg-indigo-500 text-white"
                    >
                      <p>{askedQuestion && askedQuestion.question.question}</p>
                    </div>
                    <div className="text-xl hidden lg:flex justify-center items-center bg-violet-500 text-white px-4 h-full py-2">
                      <p>{askedQuestion && askedQuestion.question.category}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-xl w-full col-span-5 rounded-full bg-violet-500 text-white px-4 py-2.5">
                    {round ? 'De ronde is gestart! Nog geen vraag gesteld.' : (
                      <>
                        Join via
                        {' '}
                        <span className="underline">
                          {teamUrl}
                          /
                          {lobbyCode}
                        </span>
                        .
                      </>
                    )}
                  </p>
                )}
              </div>
              {askedQuestion && (
              <div className="relative w-fit pl-4">
                <span className="absolute left-10 z-10 rounded-full -top-3.5 w-1 h-4 bg-black" />
                <span className="absolute right-5 z-10 rounded-full -top-3.5 w-1 h-4 bg-black" />
                <p className="text-xl z-20 inline-flex items-center gap-x-2 w-fit bg-white border-2 border-indigo-500 rounded-full text-indigo-500 px-4 py-2">
                  {askedQuestion && askedQuestion.closed ? (
                    <>
                      <Unlock className="text-green-500" strokeWidth={2} />
                      <span>{askedQuestion.question.answer}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="text-red-500" strokeWidth={2} />
                      Verborgen
                    </>
                  )}
                </p>
              </div>
              )}
            </div>
          </div>
          <ScoreboardTable teams={teams} />
        </div>
        {teams && teams.length > 0 && <ProfileBar teams={teams} />}
      </div>
    </div>
  );
}

export default Scoreboard;
