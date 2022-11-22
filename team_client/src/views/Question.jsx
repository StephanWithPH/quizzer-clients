import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import toastr from 'toastr';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { getRoundsActionAsync } from '../actions/roundActionCreator';
import Loader from '../components/Loader';
import { setAnswerAction, setGivenAnswerAction } from '../actions/questionActionCreator';
import fetcher from '../fetcher';
import ImageViewer from '../components/ImageViewer';

function Question() {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);
  const { lobbyCode } = useSelector((state) => state.global);
  const [imgFullScreen, setImgFullScreen] = useState(false);
  const round = useSelector((state) => state.rounds[state.rounds.length - 1]);
  let askedQuestion = [];
  if (round) {
    askedQuestion = round.askedQuestions[round.askedQuestions.length - 1];
  }

  useEffect(() => {
    if (askedQuestion.closed) {
      setImgFullScreen(false);
    }
  }, [askedQuestion]);

  const serverURL = process.env.REACT_APP_API_URL;

  const handleAnswerChange = (event) => {
    if (event.target.value.length > 35) {
      event.target.classList.add('!ring-red-500');
    } else {
      event.target.classList.remove('!ring-red-500');
      dispatch(setAnswerAction(event.target.value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!question.answer) {
      toastr.error('Vul a.u.b een antwoord in');
    } else {
      fetcher(`${serverURL}/api/v1/team/quizzes/${lobbyCode}/rounds/${round._id}/askedQuestions/${askedQuestion._id}/givenAnswers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: question.answer,
        }),
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => { throw new Error(text); });
        }
        return res.json();
      }).then(() => {
        dispatch(setGivenAnswerAction(question.answer));
      }).catch((error) => {
        const message = JSON.parse(error.message).error;
        toastr.error(message);
      });
    }
  };

  useEffect(() => {
    dispatch(getRoundsActionAsync());
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      {askedQuestion.closed && (
        <div className="fixed w-full z-10 h-screen top-0 left-0 bg-black/75 gap-y-5 flex flex-col justify-center items-center">
          <Loader styles="z-20 text-white h-10 w-10" />
          <p className="z-20 text-white">Wacht op instructies van de Quizmaster!</p>
        </div>
      )}
      {
        askedQuestion.question.image && (
          <Transition
            show={imgFullScreen && !askedQuestion.closed}
            enter="transform transition ease-out duration-500"
            enterFrom="opacity-0 translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="transform transition ease-out duration-500"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-full"
          >
            <ImageViewer
              url={askedQuestion.question.image}
              onClose={() => setImgFullScreen(false)}
            />
          </Transition>
        )
      }

      <Header />
      <div className="flex flex-col mx-5 gap-y-10 h-full items-center justify-center">
        <div className="flex justify-center items-center flex-col gap-y-2">
          <h2 className="text-3xl font-bold">Vraag</h2>
          <p className="text-lg text-center">{round && askedQuestion.question.question ? askedQuestion.question.question : <Loader />}</p>
        </div>
        {askedQuestion.question.image && (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <img className="w-96 h-60 object-cover rounded mt-5" src={askedQuestion.question.image} alt="question" onClick={() => setImgFullScreen(true)} />
        )}
        <form className="flex w-full flex-col justify-center items-center gap-y-5" onSubmit={handleSubmit}>
          <Input name="antwoord" styles="bg-white w-full md:w-1/2 lg:w-1/3" disabled={askedQuestion.closed} value={question.answer || question.answer} placeholder="Antwoord" onChange={handleAnswerChange} />
          <Button styles="w-full md:w-1/2 lg:w-1/3" disabled={askedQuestion.closed} type="submit" name="Verstuur" />

          {question && question.givenAnswer && (
            <div className="text-center">
              <p className="text-gray-500/75 dark:text-gray-300">Het antwoord dat je hebt opgegeven is:</p>
              <p>{question.givenAnswer}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Question;
