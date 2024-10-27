import toastr from 'toastr';
import Loader from '../Loader';
import { getRoundsActionAsync } from '../../actions/roundActionCreator';
import fetcher from '../../fetcher';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { ChangeEvent, useEffect, useState } from 'react';
import GivenAnswer from '../../models/givenAnswer.ts';

interface QuestionOverviewItemProps {
    name: string;
    id: string;
}
function QuestionOverviewItem({ name, id }: QuestionOverviewItemProps) {
    const dispatch = useAppDispatch();
    const serverURL = import.meta.env.VITE_API_URL;
    const globalState = useAppSelector((state) => state.global);
    const round = useAppSelector((state) => state.rounds[state.rounds.length - 1]);
    const askedQuestion = round.askedQuestions[round.askedQuestions.length - 1];

    const [givenAnswer, setGivenAnswer] = useState<GivenAnswer | undefined>();

    useEffect(() => {
        if (askedQuestion) {
            setGivenAnswer(askedQuestion.givenAnswers.find((givenAnswer) => givenAnswer.team._id === id));
        }
    }, [setGivenAnswer, askedQuestion, id]);

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        fetcher(
            `${serverURL}/quizMaster/quiz/${globalState?.lobbyCode}/rounds/${round._id}/askedquestions/${askedQuestion._id}/givenanswers/${givenAnswer?._id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isCorrect: e.target.checked
                })
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
            })
            .then(() => dispatch(getRoundsActionAsync()))
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };
    return (
        <div
            className={`flex gap-3 border-b px-4 py-2 transition-all dark:border-neutral-400 
    ${givenAnswer && givenAnswer.isCorrect ? 'bg-indigo-100 dark:bg-violet-600' : 'bg-gray-50 dark:bg-neutral-600'}`}
        >
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-x-2">
                    <input
                        id={`approve-${name}`}
                        type="checkbox"
                        onChange={handleCheck}
                        checked={givenAnswer && givenAnswer.isCorrect}
                        disabled={(askedQuestion && !askedQuestion.closed) || !givenAnswer}
                        className="w-4 h-4 accent-indigo-500"
                    />
                    <label className="font-bold" htmlFor={`approve-${name}`}>
                        {name}
                    </label>
                </div>
                {askedQuestion && !askedQuestion.closed && !givenAnswer ? (
                    <Loader styles="text-indigo-500 dark:text-indigo-400" />
                ) : (
                    <p className="rounded-xl text-sm text-white p-2 dark:bg-neutral-800 bg-indigo-500">
                        {givenAnswer ? (
                            <span className={!askedQuestion.closed ? 'italic' : ''}>{askedQuestion.closed ? givenAnswer.answer : 'Verborgen'}</span>
                        ) : (
                            'Geen antwoord gegeven'
                        )}
                    </p>
                )}
            </div>
        </div>
    );
}

export default QuestionOverviewItem;
