import React, { useEffect, useState } from 'react';
import { Search, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ModalContainer from '../../components/dashboard/ModalContainer';
import NewQuestion from '../../components/dashboard/Modals/NewQuestion';
import DeleteQuestions from '../../components/dashboard/Modals/DeleteQuestions';
import {
  getQuestionsActionAsync,
} from '../../actions/dashboardActionCreator';
import QuestionsTable from '../../components/dashboard/QuestionsTable';

function Questions() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const { questions, totalQuestionCount } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      dispatch(getQuestionsActionAsync(search, page));
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [search]);

  const handlePageChange = (e) => {
    setPage(e.selected + 1);
    dispatch(getQuestionsActionAsync(search, e.selected + 1));
  };

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-10">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-medium">Alle Vragen</h1>
          <div className="flex gap-4 col-span-2">
            <Button name="Vragen Importeren" disabled />
            <Button name="Vragen Verwijderen" onClick={() => setDeleteOpen(true)} styles="!bg-red-500 hover:!bg-red-400 ring-red-500 hover:ring-red-400" />
          </div>
        </div>
        <div className="w-full 2xl:w-2/3 bg-white dark:text-white grid grid-cols-4 gap-x-5 dark:bg-neutral-800 rounded-md px-10 py-6 shadow-xl">
          <div className="flex gap-y-2 flex-col">
            <p className="text-lg font-medium">Type vraag</p>
          </div>
          <div className="flex gap-y-2 flex-col col-span-2">
            <p className="text-lg font-medium">Welke vraag zoek je?</p>
            <div className="relative w-full">
              <Search className="text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2" />
              <Input
                name="search"
                styles="w-full pl-12"
                value={search}
                placeholder="Zoek een vraag"
                onChange={handleSearch}
              />
              {search && <X onClick={() => setSearch('')} className="text-red-400 absolute top-1/2 right-4 transform -translate-y-1/2" />}
            </div>
          </div>
          <label className="flex text-black dark:text-gray-100 justify-end items-center w-full h-full">
            <div className="flex flex-col gap-y-2 justify-start">
              <p>Maak een nieuwe vraag</p>
              <Button name="Aanmaken" styles="w-full" onClick={() => setCreateOpen(true)} />
            </div>
          </label>
        </div>
        <div className="w-full bg-gray-50 dark:text-white dark:bg-neutral-800 rounded-md shadow-xl">
          {questions.length > 0 ? (
            <QuestionsTable />
          ) : (
            <div className="flex flex-col items-center justify-center gap-y-2 h-96">
              <p className="text-3xl font-medium">Geen vragen gevonden</p>
              <p className="text-lg">Probeer een andere zoekterm of maak een nieuwe vraag</p>
            </div>
          )}
        </div>
        {totalQuestionCount > 10 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Volgende"
          previousLabel="Vorige"
          onPageChange={handlePageChange}
          renderOnZeroPageCount={null}
          pageCount={Math.ceil(totalQuestionCount / 10)}
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
      </div>

      {createOpen && (
      <ModalContainer setModalOpen={setCreateOpen}>
        <NewQuestion setModalOpen={setCreateOpen} />
      </ModalContainer>
      )}

      {deleteOpen && (
      <ModalContainer setModalOpen={setDeleteOpen}>
        <DeleteQuestions setModalOpen={setDeleteOpen} />
      </ModalContainer>
      )}
    </DashboardLayout>
  );
}

export default Questions;
