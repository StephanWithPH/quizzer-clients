import React, { useEffect, useState } from 'react';
import {
  Search, X,
} from 'react-feather';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Input from '../../components/Input';
import { getQuizzesActionAsync } from '../../actions/dashboardActionCreator';
import QuizzesTable from '../../components/dashboard/Tables/QuizzesTable';

function Quizzes() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      dispatch(getQuizzesActionAsync(search, page));
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [search]);

  const { quizzes, totalQuizCount } = useSelector((state) => state.dashboard);

  const handlePageChange = (e) => {
    setPage(e.selected + 1);
    dispatch(getQuizzesActionAsync(search, e.selected + 1));
  };
  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value.toUpperCase());
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="font-bold text-xl">Quizzen</h1>
            <h3 className="font-medium text-lg text-neutral-400">Bekijk hier alle quizzes die gespeeld zijn en de bijhorende resultaten</h3>
          </div>
        </div>
        <div className="w-full 2xl:w-2/3 dark:text-white grid grid-cols-4 gap-x-5 rounded-md py-6">
          <div className="flex gap-y-2 flex-col col-span-3">
            <p className="text-lg font-medium">Welke quiz zoek je?</p>
            <div className="relative w-full">
              <Search className="text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2" />
              <Input
                name="search"
                styles="w-full pl-12"
                value={search}
                placeholder="Zoek een quiz op lobbycode"
                onChange={handleSearch}
              />
              {search && <X onClick={() => setSearch('')} className="text-red-400 absolute top-1/2 right-4 transform -translate-y-1/2" />}
            </div>
          </div>
        </div>
        <div className="w-full dark:text-white rounded-md">
          {quizzes.length > 0 ? (
            <QuizzesTable />
          ) : (
            search ? (
              <div className="flex flex-col items-center shadow-md bg-white dark:bg-neutral-800 justify-center rounded-md gap-y-2 w-2/3 h-96">
                <p className="text-3xl font-medium">Geen vragen gevonden</p>
                <p className="text-lg">Probeer een andere zoekterm</p>
              </div>
            ) : (
              <div
                className="flex flex-col items-center gap-y-4 shadow-md bg-white border-2 border-dashed dark:bg-neutral-900
              dark:border-neutral-700 justify-center rounded-md w-2/3 h-96"
              >
                Er zijn nog geen quizzen gespeeld
              </div>
            )
          )}
        </div>
        {totalQuizCount > 10 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Volgende"
            previousLabel="Vorige"
            onPageChange={handlePageChange}
            renderOnZeroPageCount={null}
            pageCount={Math.ceil(totalQuizCount / 10)}
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
    </DashboardLayout>
  );
}

export default Quizzes;
