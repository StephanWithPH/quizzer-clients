import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import toastr from 'toastr';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { getRoundsActionAsync } from '../actions/roundActionCreator';
import Loader from '../components/Loader';
import fetcher from '../fetcher';
import ImageViewer from '../components/ImageViewer';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import AskedQuestion from '../models/askedQuestion.ts';
import { setAnswer, setGivenAnswer } from '../reducers/questionReducer.ts';

function Question() {
    const dispatch = useAppDispatch();
    const question = useAppSelector((state) => state.question);
    const { lobbyCode } = useAppSelector((state) => state.global);
    const [imgFullScreen, setImgFullScreen] = useState(false);
    const round = useAppSelector((state) => state.rounds.rounds[state.rounds.rounds.length - 1]);
    let askedQuestion: AskedQuestion | undefined;
    if (round) {
        askedQuestion = round.askedQuestions[round.askedQuestions.length - 1];
    }

    useEffect(() => {
        if (askedQuestion?.closed) {
            setImgFullScreen(false);
        }
    }, [askedQuestion]);

    const serverURL = import.meta.env.VITE_API_URL;

    const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 35) {
            event.target.classList.add('!ring-red-500');
        } else {
            event.target.classList.remove('!ring-red-500');
            dispatch(setAnswer(event.target.value));
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!question.answer) {
            toastr.error('Vul a.u.b een antwoord in');
        } else {
            fetcher(`${serverURL}/team/quiz/${lobbyCode}/rounds/${round._id}/askedQuestions/${askedQuestion?._id}/givenAnswers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answer: question.answer
                })
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.text().then((text) => {
                            throw new Error(text);
                        });
                    }
                    return res.json();
                })
                .then(() => {
                    dispatch(setGivenAnswer(question.answer));
                })
                .catch((error) => {
                    const message = JSON.parse(error.message).error;
                    toastr.error(message);
                });
        }
    };

    useEffect(() => {
        dispatch(getRoundsActionAsync());
    }, []);

    return (
        <div className="h-screen">
            {round && askedQuestion?.closed && (
                <div className="fixed w-full z-10 h-screen top-0 left-0 bg-black/75 gap-y-5 flex flex-col justify-center items-center">
                    <Loader styles="z-20 text-white h-10 w-10" />
                    <p className="z-20 text-white">Wacht op instructies van de Quizmaster!</p>
                </div>
            )}
            {round && askedQuestion?.question.image && (
                <Transition
                    show={imgFullScreen && !askedQuestion.closed}
                    enter="transform transition ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transform transition ease-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ImageViewer url={askedQuestion.question.image} onClose={() => setImgFullScreen(false)} />
                </Transition>
            )}

            <Header />
            <div className="flex flex-col mx-5 gap-y-10 h-full items-center justify-center">
                <div className="flex justify-center items-center flex-col gap-y-2">
                    <h2 className="text-3xl font-bold">Vraag</h2>
                    <p className="text-lg text-center">{round && askedQuestion?.question.question ? askedQuestion.question.question : <Loader />}</p>
                </div>
                {round && askedQuestion?.question.image && (
                    <img
                        className="w-96 h-60 object-cover rounded mt-5"
                        src={askedQuestion.question.image}
                        alt="question"
                        onClick={() => setImgFullScreen(true)}
                    />
                )}
                <form className="flex w-full flex-col justify-center items-center gap-y-5" onSubmit={handleSubmit}>
                    <Input
                        name="antwoord"
                        styles="bg-white w-full md:w-1/2 lg:w-1/3"
                        disabled={askedQuestion?.closed}
                        value={question.answer || question.answer}
                        placeholder="Antwoord"
                        onChange={handleAnswerChange}
                    />
                    <Button styles="w-full md:w-1/2 lg:w-1/3" disabled={askedQuestion?.closed} type="submit" name="Verstuur" />

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
