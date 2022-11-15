import React from 'react';
import { useDispatch } from 'react-redux';
import { addAskedQuestionActionAsync } from '../../actions/roundActionCreator';

function SelectQuestionPanel(props) {
  const { questions } = props;
  const dispatch = useDispatch();

  const handleQuestionClick = (questionId) => {
    dispatch(addAskedQuestionActionAsync(questionId));
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h1 className="text-xl mb-3">Selecteer volgende vraag</h1>
      <div className="flex-1 overflow-y-auto h-full dark:bg-neutral-700 dark:border-neutral-400 transition-all bg-white rounded-lg rounded border-2 border-gray-200">
        {questions.map((question) => (
          <button
            onClick={() => handleQuestionClick(question._id)}
            key={question.question}
            className="inline-flex gap-x-10 focus:bg-indigo-50 outline-none hover:bg-indigo-50 dark:hover:bg-violet-600
            justify-between items-center w-full px-4 py-2 border-b dark:border-neutral-400 border-gray-200"
          >
            <p className="text-left">{question.question}</p>
            <span
              className="rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white px-4 py-2 text-xs font-bold"
            >
              {question.category}
            </span>
          </button>
        ))}
      </div>
    </div>

  );
}

export default SelectQuestionPanel;
