import {useCallback, useEffect, useState} from 'react';
import Header from '../components/Header';
import SelectQuestionPanel from '../components/selectquestion/SelectQuestionPanel';
import { getQuestionsActionAsync } from '../actions/questionActionCreator';
import Button from '../components/Button';
import { addAskedQuestionActionAsync } from '../actions/roundActionCreator';
import selectRandomQuestionFromCategories from '../helpers/selectQuestionsFromCategoryHelper';
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {setQuestions} from "../reducers/questionReducer.ts";
import Question from "../models/question.ts";

function SelectQuestion() {
  const questions = useAppSelector((state) => state.questions);
  const [selectableQuestions, setSelectableQuestions] = useState<Question[]>([]);
  const dispatch = useAppDispatch();

  const getRandomQuestions = useCallback(() => {
    setSelectableQuestions(selectRandomQuestionFromCategories(questions));
  }, [questions]);

  useEffect(() => {
    dispatch(setQuestions([]));
    dispatch(getQuestionsActionAsync());
  }, [dispatch]);

  useEffect(() => {
    getRandomQuestions();
  }, [getRandomQuestions, questions]);

  const handleSelectRandomQuestionClick = () => {
    dispatch(addAskedQuestionActionAsync(questions[Math.floor(Math.random() * questions.length)]._id));
  };

  return (
    <div className="transition-all dark:text-white min-h-screen dark:bg-neutral-800">
      <Header />
      <div className="h-full flex flex-col gap-10 mt-4 mx-20">
        <div className="w-full h-[70vh] overflow-hidden">
          <SelectQuestionPanel questions={selectableQuestions} />
        </div>
        <div className="flex justify-between mt-3 gap-x-5">
          <Button disabled={questions.length === 0} name="Nieuwe vragen ophalen" onClick={() => getRandomQuestions()} />
          <Button disabled={questions.length === 0} name="Selecteer willekeurig" onClick={() => handleSelectRandomQuestionClick()} />
        </div>
      </div>
    </div>
  );
}

export default SelectQuestion;
