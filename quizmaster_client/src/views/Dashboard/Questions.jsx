import React, { useEffect, useState } from 'react';
import { Search, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ModalContainer from '../../components/dashboard/ModalContainer';
import NewQuestion from '../../components/dashboard/Modals/NewQuestion';
import DeleteQuestions from '../../components/dashboard/Modals/DeleteQuestions';
import { getQuestionsActionAsync } from '../../actions/dashboardActionCreator';
import QuestionsTable from '../../components/dashboard/QuestionsTable';

function Questions() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const questions = useSelector((state) => state.dashboard.questions);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      //
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [search]);

  useEffect(() => {
    dispatch(getQuestionsActionAsync());
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClearSearch = () => {
    setSearch('');
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
            <div className="relative w-full">
              <Search className="text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2" />
              <Input
                name="search"
                styles="w-full pl-12"
                value={search}
                placeholder="Dropdown"
                onChange={handleSearch}
              />
              {search && <X onClick={handleClearSearch} className="text-red-400 absolute top-1/2 right-4 transform -translate-y-1/2" />}
            </div>
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
              {search && <X onClick={handleClearSearch} className="text-red-400 absolute top-1/2 right-4 transform -translate-y-1/2" />}
            </div>
          </div>
          <Button name="Nieuwe Vraag" styles="justify-self-end" onClick={() => setCreateOpen(true)} />
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
