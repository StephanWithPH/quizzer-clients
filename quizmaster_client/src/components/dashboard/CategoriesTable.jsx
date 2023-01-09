import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalContainer from './ModalContainer';
import DeleteCategory from './Modals/DeleteCategory';

function CategoriesTable() {
  const { categories } = useSelector((state) => state.dashboard);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const deleteCategory = (category) => {
    setShowModal(true);
    setSelectedCategory(category);
  };

  return (
    <>
      <table className="w-full dark:text-white rounded-md overflow-hidden">
        <thead>
          <tr className="text-left bg-indigo-300 dark:bg-indigo-500">
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
              Categorie
            </th>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
              Referenties
            </th>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider w-44">
              Acties
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category._id}
              className="px-6 py-4 even:bg-indigo-50 odd:bg-indigo-100 dark:odd:bg-neutral-700 dark:bg-neutral-800"
            >
              <td className="px-6 py-4 capitalize text-lg">
                {category.name}
              </td>
              <td className="px-6 py-4 capitalize">
                <span className="bg-indigo-300/30 font-medium px-4 py-px flex items-center justify-center
                text-indigo-500 dark:text-indigo-200 w-fit rounded-full text-sm"
                >
                  {category.count || 0}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/dashboard/categorieeen/${category._id}`}
                  >
                    Bewerken
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteCategory(category)}
                    className="text-left text-red-400"
                  >
                    Verwijderen
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ModalContainer setModalOpen={setShowModal}>
          <DeleteCategory category={selectedCategory} setModalOpen={setShowModal} />
        </ModalContainer>
      )}
    </>
  );
}

export default CategoriesTable;
