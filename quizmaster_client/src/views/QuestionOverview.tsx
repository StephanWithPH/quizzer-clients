import toastr from 'toastr';
import Header from '../components/Header';
import QuestionOverviewPanel from '../components/questionoverview/QuestionOverviewPanel';
import Button from '../components/Button';
import { getRoundsActionAsync } from '../actions/roundActionCreator';
import fetcher from '../fetcher';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { setRoute } from '../reducers/routerReducer.ts';
import { Routes } from '../enums/routes.ts';

function QuestionOverview() {
    const dispatch = useAppDispatch();
    const { lobbyCode } = useAppSelector((state) => state.global);
    const round = useAppSelector((state) => state.rounds[state.rounds.length - 1]);
    const askedQuestion = round.askedQuestions[round.askedQuestions.length - 1];
    const serverURL = import.meta.env.VITE_API_URL;
    const questionsPerRound = import.meta.env.VITE_QUESTIONS_PER_ROUND;

    const handleCloseQuestion = () => {
        fetcher(`${serverURL}/quizMaster/quiz/${lobbyCode}/rounds/${round._id}/askedquestions/${askedQuestion._id}`, {
            method: 'PATCH'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }

                dispatch(getRoundsActionAsync());
            })
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };

    const handleFinishRound = () => {
        fetcher(`${serverURL}/quizMaster/quiz/${lobbyCode}/rounds/${round._id}`, {
            method: 'PATCH'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
            })
            .then(() => dispatch(setRoute(Routes.NEXT_ROUND)))
            .catch(() => {
                toastr.error('Er is een fout opgetreden!');
            });
    };

    const handleNextQuestion = () => {
        dispatch(setRoute(Routes.SELECT_QUESTION));
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
                    {round.askedQuestions.length >= questionsPerRound ? (
                        <Button name="Eindig ronde" onClick={handleFinishRound} disabled={askedQuestion && !askedQuestion.closed} />
                    ) : (
                        <Button name="Volgende vraag" onClick={handleNextQuestion} disabled={askedQuestion && !askedQuestion.closed} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuestionOverview;
