import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

function ViewQuiz() {
  const { id } = useParams();

  const { quizzes } = useSelector((state) => state.dashboard);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    setQuiz(quizzes.find((q) => q._id === id));
  }, [quizzes]);

  console.log(quiz);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-10">
        <div className="w-full flex items-center">
          <h1 className="text-2xl font-medium flex justify-center items-center gap-x-4">
            Preview Quiz
            <span className="bg-indigo-300/50 dark:indigo-300/30 px-4 py-1 rounded-full text-indigo-500 dark:text-indigo-200 text-sm">
              {quiz?.lobby}
            </span>
          </h1>
        </div>
        <div className="w-full dark:text-white rounded-md flex flex-col px-6">
          <p>Content</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ViewQuiz;
