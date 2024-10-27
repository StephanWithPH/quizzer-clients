import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { getCategoriesActionAsync } from '../../actions/categoryActionCreator';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import Category from '../../models/category.ts';

interface SelectCategoriesPanelProps {
    selectedCategories: Category[];
    setSelectedCategories: Dispatch<SetStateAction<Category[]>>;
    maxCategories: number;
}

function SelectCategoriesPanel({ selectedCategories, setSelectedCategories, maxCategories }: SelectCategoriesPanelProps) {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.categories);

    function handleSelect(e: ChangeEvent<HTMLInputElement>, category: Category) {
        setSelectedCategories(
            selectedCategories.map((c) => {
                if (c.name === category.name) {
                    return { ...c, selected: e.target.checked };
                }
                return c;
            })
        );
    }

    useEffect(() => {
        setSelectedCategories(categories.map((category) => ({ name: category, selected: false })));
    }, [categories]);

    useEffect(() => {
        dispatch(getCategoriesActionAsync());
    }, []);

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <h1 className="text-xl dark:text-white mb-3">Selecteer categorieën voor ronde</h1>
            <div
                className="flex-1 overflow-y-auto h-full rounded-lg dark:bg-neutral-700 dark:text-white
      transition-all dark:border-neutral-400 bg-white border-2 border-gray-200"
            >
                {selectedCategories.map((category) => (
                    <div
                        key={category.name}
                        className={`
            ${category.selected ? 'bg-indigo-100 dark:bg-violet-600 ' : ''}
            ${!category.selected && selectedCategories.filter((e) => e.selected).length >= maxCategories ? 'text-gray-300 ' : ''}
            bg-gray-50 dark:bg-neutral-600 border-b-2 dark:border-neutral-400 flex items-center gap-x-2 accent-indigo-500 px-4 py-2 border-gray-200`}
                    >
                        <label className="w-full flex-1" htmlFor={`cat-${category.name}`}>
                            <div className="flex items-center gap-2 w-full">
                                <input
                                    id={`cat-${category.name}`}
                                    disabled={
                                        !category.selected &&
                                        (selectedCategories.filter((e) => e.selected).length >= maxCategories ||
                                            selectedCategories.filter((e) => e.selected).length >= selectedCategories.length)
                                    }
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={category.selected}
                                    onChange={(e) => handleSelect(e, category)}
                                />

                                {category.name}
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectCategoriesPanel;
