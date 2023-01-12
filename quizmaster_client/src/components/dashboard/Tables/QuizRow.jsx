import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MIN_TEAMS = process.env.REACT_APP_MINIMAL_TEAMS;
const QUESTIONS_PER_ROUND = process.env.REACT_APP_QUESTIONS_PER_ROUND;

function QuizRow({ quiz }) {
  const [status, setStatus] = useState('Inactief');
  const [color, setColor] = useState('indigo');

  // Determine the status of the quiz
  const determineStatus = () => {
    // If the quiz is finished, set the status to finished
    if (quiz.finished) {
      return {
        text: 'Afgerond',
        color: 'rose',
      };
    }

    // If it's been more than a day since the quiz has been started, set the status to inactive
    const now = Date.now();
    const quizDate = new Date(quiz.date).getTime();

    const oneDay = 1000 * 60 * 60 * 24;

    const diffTime = Math.abs(now - quizDate);
    const diffDays = Math.ceil(diffTime / oneDay);

    if (diffDays > 1) {
      return {
        text: 'Inactief',
        color: 'yellow',
      };
    }

    // If there are no rounds, the quiz is has not started yet
    if (quiz.rounds.length === 0) {
      return {
        text: 'Nieuw',
        color: 'indigo',
      };
    }

    // If there are rounds that are not finished, the quiz is active
    if (quiz.rounds.length > 0 && !quiz.rounds[quiz.rounds.length - 1].finished) {
      return {
        text: 'Actief',
        color: 'emerald',
      };
    }

    // If there are rounds, but not all are finished, the quiz is in progress
    return {
      text: 'In overzicht',
      color: 'orange',
    };
  };

  useEffect(() => {
    const result = determineStatus();
    setStatus(result.text);
    setColor(result.color);
  }, [quiz]);

  return (
    <tr
      className="px-6 py-4 even:bg-indigo-50 odd:bg-indigo-100 dark:odd:bg-neutral-700 dark:bg-neutral-800"
    >
      <td className="px-6 py-4">
        <span className="bg-indigo-300/30 font-medium px-4 py-2 flex items-center justify-center
                text-indigo-500 dark:text-indigo-200 w-fit rounded-full text-sm"
        >
          {quiz.lobby}
        </span>
      </td>
      <td className="px-6 pt-2 pb-3">
        <div className="flex flex-col gap-y-1 w-full h-full">
          <p className="text-sm capitalize">
            Ronde
            {' '}
            {quiz.rounds.length}
          </p>
          <div className="flex justify-between items-center gap-x-2">
            <p className="text-xs text-neutral-300">
              {`${quiz.rounds[quiz.rounds.length - 1]?.askedQuestions.length > 0
                // eslint-disable-next-line no-unsafe-optional-chaining
                ? Math.round((quiz.rounds[quiz.rounds.length - 1]?.askedQuestions.length / QUESTIONS_PER_ROUND) * 100) : 0}%`}
            </p>
            <div className="h-2 w-36 rounded-full bg-neutral-600 overflow-hidden">
              <div
                className="bg-gradient-to-r rounded-full h-2 transition-all from-green-500 to-green-300"
                /* eslint-disable-next-line no-unsafe-optional-chaining */
                style={{
                  width: `${quiz.rounds[quiz.rounds.length - 1]?.askedQuestions.length
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    ? Math.round((quiz.rounds[quiz.rounds.length - 1]?.askedQuestions.length / QUESTIONS_PER_ROUND) * 100) : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 pt-2 pb-3">
        <div className="flex flex-col gap-y-1 w-full h-full">
          <p className="text-sm capitalize">
            {quiz?.teams.filter((team) => team.accepted).length}
            {quiz?.teams.filter((team) => team.accepted).length === 1 ? ' team' : ' teams'}
          </p>
          <div className="flex justify-between items-center gap-x-2">
            <p className="text-xs text-neutral-300">
              {`${quiz.teams.filter((team) => team.accepted).length / MIN_TEAMS * 100 >= 100
                ? 100 : Math.round(quiz.teams.filter((team) => team.accepted).length / MIN_TEAMS * 100)}%`}
            </p>
            <div className="h-2 w-36 rounded-full bg-neutral-600 overflow-hidden">
              <div
                className={`bg-gradient-to-r rounded-full h-2 transition-all
                ${quiz.teams.filter((team) => team.accepted).length >= MIN_TEAMS ? 'from-green-500 to-green-300' : 'from-yellow-500 to-yellow-300'}`}
                style={{
                  width: `${quiz.teams.filter((team) => team.accepted).length >= MIN_TEAMS ? 100
                    : Math.round(quiz.teams.filter((team) => team.accepted).length / MIN_TEAMS * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`bg-${color}-300/50 dark:bg-${color}-300/30 px-4 py-1 flex items-center justify-center transition-all
                text-${color}-500 dark:text-${color}-300 min-w-[7rem] w-fit rounded-full text-sm`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 capitalize">
        {new Date(quiz.date).toLocaleDateString('nl-NL', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })}
      </td>
      <td className="px-6 py-4">
        <Link to={`/quizzen/${quiz._id}`} className="transition-all hover:text-gray-500 dark:hover:text-gray-300">
          Meer info
        </Link>
      </td>
    </tr>
  );
}

export default QuizRow;
