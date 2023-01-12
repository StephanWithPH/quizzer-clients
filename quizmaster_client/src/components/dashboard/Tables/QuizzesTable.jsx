import React from 'react';
import { useSelector } from 'react-redux';
import QuizRow from './QuizRow';

function QuizzesTable() {
  const { quizzes } = useSelector((state) => state.dashboard);

  return (
    <table className="w-full dark:text-white rounded-md overflow-hidden">
      <thead>
        <tr className="text-left bg-indigo-300 dark:bg-indigo-500">
          <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
            LobbyCode
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
            Rondes
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
            Teams
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
            Datum
          </th>
          <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider w-44">
            Acties
          </th>
        </tr>
      </thead>
      <tbody>
        {quizzes.map((quiz) => (
          <QuizRow key={quiz._id} quiz={quiz} />
        ))}
      </tbody>
    </table>
  );
}

export default QuizzesTable;