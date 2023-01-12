import React, { useEffect, useState } from 'react';
import {
  FolderPlus, Plus, Search, X,
} from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Input from '../../components/Input';
import ModalContainer from '../../components/dashboard/ModalContainer';
import CreateCategory from '../../components/dashboard/Modals/CreateCategory';
import { getCategoriesActionAsync } from '../../actions/dashboardActionCreator';
import CategoriesTable from '../../components/dashboard/Tables/CategoriesTable';

const perPage = 10;

function Categories() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);

  const { categories, totalCategoryCount } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      dispatch(getCategoriesActionAsync(search, page, perPage));
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (e) => {
    setPage(e.selected + 1);
    dispatch(getCategoriesActionAsync(search, e.selected + 1, perPage));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="font-bold text-xl">Categorieën</h1>
            <h3 className="font-medium text-lg text-neutral-400">Bekijk hier alle categorieën waaraan vragen gekoppeld kunnen worden</h3>
          </div>
        </div>
        <div className="w-full 2xl:w-2/3 dark:text-white grid grid-cols-4 gap-x-5 rounded-md py-6">
          <div className="flex gap-y-2 flex-col col-span-3">
            <p className="text-lg font-medium">Welke categorie zoek je?</p>
            <div className="relative w-full">
              <Search className="text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2" />
              <Input
                name="search"
                styles="w-full pl-12"
                value={search}
                placeholder="Zoek een categorie"
                onChange={handleSearch}
              />
              {search && <X onClick={() => setSearch('')} className="text-red-400 absolute top-1/2 right-4 transform -translate-y-1/2" />}
            </div>
          </div>
          <label className="flex justify-end items-center w-full h-full">
            <Plus
              size={45}
              className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-400 transition-all text-white cursor-pointer"
              onClick={() => setCreateOpen(true)}
            />
          </label>
        </div>
        <div className="w-full dark:text-white rounded-md">
          {categories.length > 0 ? (
            <CategoriesTable />
          ) : (
            search ? (
              <div className="flex flex-col items-center shadow-md bg-white dark:bg-neutral-800 justify-center rounded-md gap-y-2 w-2/3 h-96">
                <p className="text-3xl font-medium">Geen categorieën gevonden</p>
                <p className="text-lg">Probeer een andere zoekterm</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="flex flex-col items-center gap-y-4 shadow-md bg-white border-2 border-dashed dark:bg-neutral-900
              dark:border-neutral-700 justify-center rounded-md w-2/3 h-96 hover:border-indigo-500 transition-all"
              >
                <FolderPlus size={60} className="text-indigo-400" strokeWidth={1} />
                <p className="text-xl font-medium">Maak een nieuwe categorie</p>
              </button>
            )
          )}
        </div>
        {totalCategoryCount > perPage && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Volgende"
            previousLabel="Vorige"
            onPageChange={handlePageChange}
            renderOnZeroPageCount={null}
            pageCount={Math.ceil(totalCategoryCount / perPage)}
            pageRangeDisplayed={5}
            containerClassName="flex justify-start items-center rounded-md shadow-sm"
            nextClassName="relative text-white inline-flex transition-all items-center bg-indigo-500 dark:bg-indigo-400/50
          dark:hover:bg-indigo-400/75 cursor-pointer hover:bg-indigo-400 rounded-r-md px-3 py-2 text-sm font-medium"
            activeLinkClassName="!bg-indigo-500 dark:!bg-indigo-400/50 !cursor-default"
            pageLinkClassName="relative z-10 inline-flex transition-all bg-gray-400 hover:bg-indigo-500
          dark:bg-neutral-700 dark:hover:bg-indigo-400/50 items-center px-4 py-2 text-sm font-medium text-white"
            breakClassName="relative z-10 inline-flex transition-all bg-gray-400 hover:bg-indigo-500 dark:bg-neutral-700/75 dark:hover:bg-neutral-700
          cursor-pointer items-center px-4 py-2 text-sm font-medium text-white"
            disabledClassName="!bg-gray-400 dark:!bg-neutral-700 !cursor-default !text-neutral-200 dark:!text-gray-400"
            previousClassName="relative text-white inline-flex transition-all items-center bg-indigo-500 dark:bg-indigo-400/50
          dark:hover:bg-indigo-400/75 cursor-pointer hover:bg-indigo-400 rounded-l-md px-3 py-2 text-sm font-medium"
          />
        )}
        {createOpen && (
        <ModalContainer setModalOpen={setCreateOpen}>
          <CreateCategory setModalOpen={setCreateOpen} />
        </ModalContainer>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Categories;
