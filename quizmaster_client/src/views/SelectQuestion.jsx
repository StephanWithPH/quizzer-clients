import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import SelectQuestionPanel from '../components/selectquestion/SelectQuestionPanel';
import { getQuestionsActionAsync, setQuestionsAction } from '../actions/questionActionCreator';
import Button from '../components/Button';
import { addAskedQuestionActionAsync } from '../actions/roundActionCreator';
import selectRandomQuestionFromCategories from '../helpers/selectQuestionsFromCategoryHelper';

function SelectQuestion() {
  const questions = useSelector((state) => state.questions);
  const [selectableQuestions, setSelectableQuestions] = useState([]);
  const dispatch = useDispatch();

  const getRandomQuestions = () => {
    setSelectableQuestions(selectRandomQuestionFromCategories(questions));
  };

  useEffect(() => {
    dispatch(setQuestionsAction([]));
    dispatch(getQuestionsActionAsync());
  }, []);

  useEffect(() => {
    getRandomQuestions();
  }, [questions]);

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
