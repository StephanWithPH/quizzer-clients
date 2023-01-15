import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import QuestionOverviewPanel from '../components/questionoverview/QuestionOverviewPanel';
import Button from '../components/Button';
import changeRouteAction from '../actions/routerActionCreator';
import { getRoundsActionAsync } from '../actions/roundActionCreator';
import fetcher from '../fetcher';

function QuestionOverview() {
  const dispatch = useDispatch();
  const { lobbyCode } = useSelector((state) => state.global);
  const round = useSelector((state) => state.rounds[state.rounds.length - 1]);
  const askedQuestion = round.askedQuestions[round.askedQuestions.length - 1];
  const serverURL = process.env.REACT_APP_API_URL;
  const questionsPerRound = process.env.REACT_APP_QUESTIONS_PER_ROUND;

  const handleCloseQuestion = async () => {
    await toast.promise(
      fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${lobbyCode}/rounds/${round._id}/askedquestions/${askedQuestion._id}`, {
        method: 'PATCH',
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }

        return res.json();
      }),
      {
        pending: 'Vraag sluiten...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is iets fout gegaan met het sluiten van de vraag';
          },
        },
      },
    ).then(() => dispatch(getRoundsActionAsync()));
  };

  const handleFinishRound = async () => {
    await toast.promise(
      fetcher(`${serverURL}/api/v1/quizmaster/quizzes/${lobbyCode}/rounds/${round._id}`, {
        method: 'PATCH',
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => { throw new Error(text); });
        }

        return res.json();
      }),
      {
        pending: 'Ronde afronden...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is iets fout gegaan met het afronden van de ronde';
          },
        },
      },
    ).then(() => dispatch(changeRouteAction('nextRound')));
  };

  const handleNextQuestion = () => {
    dispatch(changeRouteAction('selectQuestion'));
  };

  return (
    <div className="min-h-screen dark:text-white dark:bg-neutral-800 transition-all">
      <Header />
      <div className="h-full flex flex-col gap-10 mt-4 mx-20">
        <div className="w-full h-[70vh] overflow-hidden">
          <QuestionOverviewPanel />
        </div>
        <div className="flex justify-end mt-3 gap-x-5">
          <Button name="Sluit" disabled={askedQuestion && askedQuestion.closed} onClick={handleCloseQuestion} />
          {
            round.askedQuestions.length >= questionsPerRound
              ? <Button name="Eindig ronde" onClick={handleFinishRound} disabled={askedQuestion && !askedQuestion.closed} />
              : <Button name="Volgende vraag" onClick={handleNextQuestion} disabled={askedQuestion && !askedQuestion.closed} />
          }
        </div>
      </div>
    </div>
  );
}

export default QuestionOverview;
