import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import QuizChart from '../../components/dashboard/Charts/QuizChart';
import { getDetailQuizActionAsync } from '../../actions/dashboardActionCreator';

const severURL = process.env.REACT_APP_API_URL;
const QUESTIONS_PER_ROUND = process.env.REACT_APP_QUESTIONS_PER_ROUND;

function ViewQuiz() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const quiz = useSelector((state) => state.dashboard.detailQuiz);

  useEffect(() => {
    dispatch(getDetailQuizActionAsync(id));
  }, [id]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-10">
        <div className="w-full flex items-center">
          <h1 className="text-2xl font-medium flex justify-center items-center gap-x-4">
            Preview Quiz
            <span
              className="bg-indigo-300/50 dark:indigo-300/30 px-4 py-1 rounded-full text-indigo-500 dark:text-indigo-200 text-sm"
            >
              {quiz?.lobby}
            </span>
          </h1>
        </div>
        <div className="grid xl:grid-cols-3 divide-y xl:divide-none divide-neutral-500 gap-10">
          <div className="flex flex-col gap-y-4 items-center py-6 overflow-y-auto max-h-[35rem]">
            <div className="flex flex-col">
              <h3 className="">Teams</h3>
              {quiz?.teams?.filter((team) => team.accepted).length > 0 ? (
                quiz?.teams
                  .filter((team) => team.accepted)
                  .sort((a, b) => b.roundPoints - a.roundPoints)
                  .map((team, index) => (
                    <div key={team._id} className="flex w-full items-center gap-10 justify-between">
                      <div className="flex gap-x-4 items-center">
                        <div className="rounded-full ring-2 ring-gray-500 overflow-hidden">
                          <img src={`${severURL}${team?.image}`} alt="team logo" className="w-10 h-10" />
                        </div>
                        <div>
                          <pre className="text-sm text-gray-400 dark:text-neutral-400">{`#${index + 1}`}</pre>
                          <p className="capitalize">
                            {team?.name}
                          </p>
                        </div>
                      </div>
                      <p className={`px-4 py-2 text-sm rounded-full ${team?.roundPoints > 0
                        ? 'bg-indigo-300/50 dark:bg-indigo-300/30 text-indigo-500 dark:text-indigo-300'
                        : 'bg-gray-300/50 dark:bg-gray-300/30 text-gray-500 dark:text-gray-200'}`}
                      >
                        {team?.roundPoints}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="text-sm w-full h-full border border-dashed rounded-md dark:border-neutral-500
                border-gray-500 p-2 inline-flex items-center justify-center"
                >
                  Geen Teams
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-4 items-center py-6 overflow-y-auto max-h-[35rem]">
            {quiz?.rounds?.length > 0 ? (
              quiz?.rounds.map((round, index) => (
                <div key={round._id} className="flex flex-col gap-y-1 w-fit h-min">
                  <p className="text-sm capitalize">
                    Ronde
                    {' '}
                    {index + 1}
                  </p>
                  <div className="flex items-center gap-x-5">
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      {Math.round((round?.askedQuestions.length / QUESTIONS_PER_ROUND) * 100) >= 100 ? 100
                        : Math.round((round?.askedQuestions.length / QUESTIONS_PER_ROUND) * 100)}
                      %
                    </p>
                    <div className="h-2 w-56 col-span-2 rounded-full bg-gray-300 dark:bg-neutral-600 overflow-hidden">
                      <div
                        className="bg-gradient-to-r rounded-full h-2 transition-all from-green-500 to-green-300"
                        style={{
                          width: `${round?.askedQuestions.length
                            ? Math.round((round?.askedQuestions.length / QUESTIONS_PER_ROUND) * 100) >= 100 ? 100
                              : Math.round((round?.askedQuestions.length / QUESTIONS_PER_ROUND) * 100)
                            : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm w-full h-full border border-dashed rounded-md dark:border-neutral-500
                border-gray-500 p-2 inline-flex items-center justify-center"
              >
                Geen rondes
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2 py-6 min-h-[35rem]">
            {quiz.teams?.length > 0 ? (
              <QuizChart />
            ) : (
              <div className="text-sm w-full h-full border border-dashed rounded-md dark:border-neutral-500
                border-gray-500 p-2 inline-flex items-center justify-center"
              >
                Geen ìnfo
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ViewQuiz;
