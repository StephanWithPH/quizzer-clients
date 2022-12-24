import React, { useState } from 'react';
import { AlertTriangle } from 'react-feather';
import toastr from 'toastr';
import Button from '../../Button';
import fetcher from '../../../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

function DeleteQuestions({ setModalOpen }) {
  const [disabled, setDisabled] = useState(false);

  const handleDelete = () => {
    setDisabled(true);
    fetcher(`${serverURL}/api/v1/admin/questions`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Er is iets fout gegaan');
      }

      toastr.success('Alle vragen zijn verwijderd');
      setModalOpen(false);
    }).catch((err) => {
      toastr.error(err.message);
    }).finally(() => setDisabled(false));
  };

  return (
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white dark:bg-neutral-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <div className="w-fit flex p-4 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-300">
              <AlertTriangle size={30} strokeWidth={2} className="text-red-500 dark:text-red-600" />
            </div>
            <div className="flex flex-col justify-center items-center gap-y-4">
              <h3 className="text-2xl font-medium leading-6 dark:text-white text-gray-900" id="modal-title">Vragen verwijderen</h3>
              <p className="dark:text-gray-400 text-gray-500 text-center">
                Weet je zeker dat je alle vragen wil verwijderen?
                Alle vragen zullen permanent verwijderd worden.
                Deze actie kan niet teruggedraaid worden.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-neutral-700 px-4 py-3 sm:flex gap-x-2 sm:flex-row-reverse sm:px-6">
          <Button
            disabled={disabled}
            name="Verwijderen"
            onClick={handleDelete}
            styles="!text-sm disabled:!bg-gray-400 font-medium !bg-red-600 hover:!bg-red-500 ring-offset-0 ring-0"
          />
          <Button
            name="Annuleren"
            onClick={() => setModalOpen(false)}
            styles="!text-sm font-medium !bg-gray-500 hover:!bg-gray-400 ring-offset-0 ring-0"
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteQuestions;
