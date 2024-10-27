import { useState } from 'react';
import toastr from 'toastr';
import Header from '../components/Header';
import SelectCategoriesPanel from '../components/selectcategories/SelectCategoriesPanel';
import Button from '../components/Button';
import { createRoundActionAsync } from '../actions/roundActionCreator';
import fetcher from '../fetcher';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import Category from '../models/category.ts';
import { setRoute } from '../reducers/routerReducer.ts';
import { Routes } from '../enums/routes.ts';
import { clearRounds } from '../reducers/roundReducer.ts';

function NextRound() {
    const maxCategories = import.meta.env.VITE_MAXIMAL_CATEGORIES;
    const dispatch = useAppDispatch();
    const serverURL = import.meta.env.VITE_API_URL;
    const { lobbyCode } = useAppSelector((state) => state.global);
    const rounds = useAppSelector((state) => state.rounds);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const handleFinishQuizClick = () => {
        fetcher(`${serverURL}/quizMaster/quiz/${lobbyCode}`, {
            method: 'PATCH'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
            })
            .then(() => {
                document.title = 'QuizMaster';
                dispatch(setRoute(Routes.LOGIN));
                dispatch(clearRounds());
            })
            .catch(() => {
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
                        setSelectedCategories={setSelectedCategories}
                        maxCategories={maxCategories}
                    />
                </div>
                <div className="flex justify-end gap-x-5">
                    {rounds.length > 0 && <Button name="Eindig quiz" onClick={handleFinishQuizClick} />}
                    <Button
                        name="Start ronde"
                        disabled={
                            selectedCategories.filter((e) => e.selected).length.toString() !== maxCategories &&
                            selectedCategories.filter((e) => e.selected).length !== selectedCategories.length
                        }
                        onClick={handleStartRoundClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default NextRound;
