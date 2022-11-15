import React, { useState } from 'react';
import toastr from 'toastr';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import SelectCategoriesPanel from '../components/selectcategories/SelectCategoriesPanel';
import Button from '../components/Button';
import changeRouteAction from '../actions/routerActionCreator';
import { clearRoundAction, createRoundActionAsync } from '../actions/roundActionCreator';

function NextRound() {
  const maxCategories = process.env.REACT_APP_MAXIMAL_CATEGORIES;
  const dispatch = useDispatch();
  const serverURL = process.env.REACT_APP_API_URL;
  const { lobbyCode } = useSelector((state) => state.global);
  const rounds = useSelector((state) => state.rounds);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFinishQuizClick = () => {
    fetch(`${serverURL}/api/v1/quizmaster/quizzes/${lobbyCode}`, {
      method: 'PATCH',
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }
    }).then(() => {
      document.title = 'Quizmaster';
      dispatch(changeRouteAction('login'));
      dispatch(clearRoundAction());
    }).catch(() => {
      toastr.error('Er is een fout opgetreden!');
    });
  };

  const handleStartRoundClick = () => {
    if (selectedCategories.filter((e) => e.selected).length.toString() !== maxCategories) {
      toastr.error('Je hebt teveel of te weinig categorieën geselecteerd');
    } else {
      const chosenCategories = selectedCategories.filter((e) => e.selected).map((e) => e.name);
      dispatch(createRoundActionAsync(chosenCategories));
    }
  };
  return (
    <div className="min-h-screen transition-all dark:bg-neutral-800">
      <Header />
      <div className="h-full flex flex-col gap-10 mt-4 mx-20">
        <div className="w-full h-[70vh] overflow-hidden">
          <SelectCategoriesPanel
            selectedCategories={selectedCategories}
            setSelectedCategories={(e) => setSelectedCategories(e)}
            maxCategories={maxCategories}
          />
        </div>
        <div className="flex justify-end gap-x-5">
          {rounds.length > 0 && (
            <Button name="Eindig quiz" onClick={handleFinishQuizClick} />
          )}
          <Button
            name="Start ronde"
            disabled={selectedCategories.filter((e) => e.selected).length.toString()
              !== maxCategories && selectedCategories.filter((e) => e.selected).length !== selectedCategories.length}
            onClick={handleStartRoundClick}
          />
        </div>
      </div>
    </div>
  );
}

export default NextRound;
