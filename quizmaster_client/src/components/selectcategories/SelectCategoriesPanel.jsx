import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesActionAsync, setCategoriesAction } from '../../actions/categoryActionCreator';

function SelectCategoriesPanel(props) {
  const { selectedCategories, setSelectedCategories, maxCategories } = props;
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const showHidden = window.localStorage.getItem('showHidden');

  function handleSelect(e, category) {
    setSelectedCategories(selectedCategories.map((c) => {
      if (c.name === category.name) {
        return { ...c, selected: e.target.checked };
      }
      return c;
    }));
  }

  useEffect(() => {
    setSelectedCategories(categories.map((category) => ({ name: category, selected: false })));
  }, [categories]);

  useEffect(() => {
    dispatch(setCategoriesAction([]));
    dispatch(getCategoriesActionAsync());
  }, []);
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h1 className="text-xl dark:text-white mb-3">Selecteer categorieën voor ronde</h1>
      <div className="flex-1 overflow-y-auto h-full rounded-lg dark:bg-neutral-700 dark:text-white
      transition-all dark:border-neutral-400 bg-white rounded border-2 border-gray-200"
      >
        {selectedCategories.filter((e) => showHidden || e.name !== 'Ochten').map((category) => (
          <div
            key={category.name}
            className={`
            ${category.selected ? 'bg-indigo-100 dark:bg-violet-600 ' : ''}
            ${!category.selected && selectedCategories.filter((e) => e.selected).length >= maxCategories ? 'text-gray-300 ' : ''}
            bg-gray-50 dark:bg-neutral-600 border-b-2 dark:border-neutral-400 flex items-center gap-x-2 accent-indigo-500 px-4 py-2 border-b border-gray-200`}
          >
            <input
              id={`cat-${category.name}`}
              disabled={!category.selected
                  && (selectedCategories.filter((e) => e.selected).length >= maxCategories
                  || selectedCategories.filter((e) => e.selected).length >= selectedCategories.length)}
              type="checkbox"
              className="w-4 h-4"
              value={category.selected}
              onChange={(e) => handleSelect(e, category)}
            />
            <label htmlFor={`cat-${category.name}`}>{category.name}</label>
          </div>
        ))}
      </div>
    </div>

  );
}

export default SelectCategoriesPanel;
