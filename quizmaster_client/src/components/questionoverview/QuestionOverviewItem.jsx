import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import { getRoundsActionAsync } from '../../actions/roundActionCreator';
import fetcher from '../../fetcher';

function QuestionOverviewItem(props) {
  const { name, id } = props;
  const dispatch = useDispatch();
  const serverURL = process.env.REACT_APP_API_URL;
  const { lobbyCode } = useSelector((state) => state.global);
  const round = useSelector((state) => state.rounds[state.rounds.length - 1]);
  const askedQuestion = round.askedQuestions[round.askedQuestions.length - 1];
  let answer = '';
  if (askedQuestion) {
    answer = askedQuestion.givenAnswers.find((givenAnswer) => givenAnswer.team._id === id);
  }

  const handleCheck = (e) => {
    fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${lobbyCode}/rounds/${round._id}/askedquestions/${askedQuestion._id}/givenanswers/${answer._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isCorrect: e.target.checked,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
    }).then(() => dispatch(getRoundsActionAsync()))
      .catch(() => {
        toast.error('Er is een fout opgetreden met het beoordelen van de vraag!');
      });
  };
  return (
    <div className={`flex gap-3 border-b px-4 py-2 transition-all dark:border-neutral-400 
    ${answer && answer.isCorrect ? 'bg-indigo-100 dark:bg-violet-600' : 'bg-gray-50 dark:bg-neutral-600'}`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-x-2">
          <input
            id={`approve-${name}`}
            type="checkbox"
            onChange={handleCheck}
            value={answer && answer.isCorrect}
            disabled={askedQuestion && !askedQuestion.closed || !answer}
            className="w-4 h-4 accent-indigo-500"
          />
          <label className="font-bold" htmlFor={`approve-${name}`}>{name}</label>
        </div>
        {askedQuestion && !askedQuestion.closed && !answer ? (
          <Loader styles="text-indigo-500 dark:text-indigo-400" />
        ) : (
          <p className="rounded-xl text-sm text-white p-2 dark:bg-neutral-800 bg-indigo-500">
            {answer ? (
              <span className={!askedQuestion.closed ? 'italic' : ''}>{askedQuestion.closed ? answer.answer : 'Verborgen' }</span>
            ) : 'Geen antwoord gegeven'}
          </p>
        )}
      </div>
    </div>
  );
}

export default QuestionOverviewItem;
