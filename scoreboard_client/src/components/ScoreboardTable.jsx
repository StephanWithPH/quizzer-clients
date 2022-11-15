import React, { useEffect } from 'react';
import { Check, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizTeamsActionAsync } from '../actions/teamActionCreator';
import { getQuizRoundsActionAsync } from '../actions/roundActionCreator';
import { getCorrectQuestionsActionAsync } from '../actions/correctQuestionsActionCreator';
import Loader from './Loader';

function ScoreboardTable(props) {
  const { teams } = props;
  const dispatch = useDispatch();
  const correctQuestions = useSelector((state) => state.correctQuestions);
  const rounds = useSelector((state) => state.rounds);
  const round = rounds[rounds.length - 1];

  let askedQuestion;
  if (round) {
    askedQuestion = round.askedQuestions[round.askedQuestions.length - 1];
  }

  useEffect(() => {
    dispatch(getQuizTeamsActionAsync());
    dispatch(getQuizRoundsActionAsync());
    if (round) {
      dispatch(getCorrectQuestionsActionAsync());
    }
  }, []);

  return (
    teams.length > 0 ? (
      <div className="border-2 my-4 border-grey-300 dark:border-neutral-500 shadow-md overflow-hidden rounded-xl">
        <table className="w-full text-left">
          <thead className="text-base uppercase dark:text-white dark:bg-neutral-700 text-black bg-gray-50">
            <tr>
              <th className="py-3 px-6">
                #
              </th>
              <th className="py-3 px-6">
                Team
              </th>
              <th className="py-3 px-6">
                RP
              </th>
              <th className="py-3 px-6 hidden lg:table-cell">
                # Correct
              </th>
              <th className="py-3 px-6 hidden lg:table-cell">
                Geantwoord
              </th>
              <th className="py-3 px-6">
                Antwoord
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team._id} className="bg-white dark:bg-neutral-600 dark:border-neutral-400 border-b">
                <td className="py-4 px-6 font-black">
                  {index + 1}
                </td>
                <td className="py-4 px-6 dark:text-white dark:font-bold text-gray-900 whitespace-nowrap">
                  {team.name}
                </td>
                <td className="py-4 px-6">
                  <span className="bg-indigo-500 py-px text-white rounded-full px-4">{team.roundPoints}</span>
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  {correctQuestions && correctQuestions.find((correctQuestion) => correctQuestion._id === team._id) ? (
                    <p>{`${correctQuestions.find((correctQuestion) => correctQuestion._id === team._id).correctAnswers} deze ronde`}</p>
                  ) : (
                    <p>0 deze ronde</p>
                  )}
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  {askedQuestion && askedQuestion.givenAnswers.find((givenAnswer) => givenAnswer.team._id === team._id) ? (
                    <Check className="text-green-500" />
                  ) : (
                    askedQuestion && askedQuestion.closed ? (
                      <X className="text-red-500" />
                    ) : (
                      askedQuestion ? (
                        <Loader styles="dark:text-white" />
                      ) : (
                        <p className="font-bold">-</p>
                      )
                    )
                  )}
                </td>
                <td className="py-4 px-6 font-medium">
                  {askedQuestion && askedQuestion.closed
                  && askedQuestion.givenAnswers.find((givenAnswer) => givenAnswer.team._id === team._id) ? (
                      askedQuestion.givenAnswers.find((givenAnswer) => givenAnswer.team._id === team._id).answer
                    ) : (
                      askedQuestion && askedQuestion.givenAnswers.find((givenAnswer) => givenAnswer.team._id === team._id) ? (
                        <p className="italic font-normal">Verborgen</p>
                      ) : (
                        <p className="font-bold">-</p>
                      )
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="flex flex-col gap-y-10 items-center justify-center w-full h-full">
        <Loader styles="h-10 w-10 dark:text-white" />
        <h2 className="text-neutral-600 dark:text-gray-300">Wachten op teams. Join via de bovenstaande url. De quizmaster zal dan oordelen of je deel mag nemen.</h2>
      </div>
    )
  );
}

export default ScoreboardTable;
