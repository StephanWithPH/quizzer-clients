import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuestionOverviewItem from './QuestionOverviewItem';
import { getRoundsActionAsync } from '../../actions/roundActionCreator';
import Loader from '../Loader';

function QuestionOverviewPanel() {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams).filter((team) => team.accepted);
  const round = useSelector((state) => state.rounds[state.rounds.length - 1]);
  const askedQuestion = round.askedQuestions[round.askedQuestions.length - 1];

  useEffect(() => {
    dispatch(getRoundsActionAsync());
  }, []);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h1 className="text-xl inline-flex gap-x-2 items-center">
        <span className="font-bold">Vraag: </span>
        { askedQuestion ? askedQuestion.question.question : <Loader /> }
      </h1>
      <h1 className="text-xl mb-3">
        <span className="font-bold">Antwoord: </span>
        {
          askedQuestion && askedQuestion.closed
            ? askedQuestion.question.answer
            : <span className="italic">Verborgen</span>
        }
      </h1>
      <div className="flex-1 overflow-y-auto bg-white dark:bg-neutral-700 dark:border-neutral-400 transition-all h-full rounded-lg rounded border-2 border-gray-200">
        {teams.map((team) => <QuestionOverviewItem key={team._id} name={team.name} id={team._id} showAnswer={askedQuestion && askedQuestion.closed} />)}
      </div>
    </div>

  );
}

export default QuestionOverviewPanel;
