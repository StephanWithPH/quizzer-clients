import React, { useState } from 'react';
import { Plus } from 'react-feather';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Input from '../../Input';
import Button from '../../Button';
import fetcher from '../../../fetcher';
import { getTotalAmountsActionAsync } from '../../../actions/sideBarActionCreator';
import { getCategoriesActionAsync } from '../../../actions/dashboardActionCreator';

const serverURL = process.env.REACT_APP_API_URL;

function CreateCategory({ setModalOpen }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await toast.promise(
      fetcher(`${serverURL}/api/v1/manage/categories`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }

        return res.json();
      }),
      {
        pending: 'Category wordt aangemaakt...',
        success: 'Category aangemaakt!',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er ging iets mis met het aanmaken van de category';
          },
        },
      },
    ).then(() => {
      dispatch(getTotalAmountsActionAsync());
      dispatch(getCategoriesActionAsync());
      setModalOpen(false);
    }).finally(() => setDisabled(false));
  };

  return (
    <div className="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <form className="w-full h-full lg:w-2/3" onSubmit={handleSubmit}>
        <div className="relative overflow-hidden rounded-lg text-left shadow-xl transition-all w-full">
          <div className="bg-white dark:bg-neutral-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 h-full">
            <div className="flex flex-col h-full items-center justify-center gap-4">
              <div className="w-full flex items-center gap-x-4">
                <div className="w-fit flex p-4 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-300">
                  <Plus size={30} strokeWidth={2} className="text-indigo-500 dark:text-indigo-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium leading-6 dark:text-white text-gray-900" id="modal-title">Categorie aanmaken</h3>
                  <p className="dark:text-gray-400 text-gray-500">
                    Maak hier een nieuwe vraag aan die in de quiz gesteld kan worden.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center w-full items-center gap-y-4">
                <div className="flex flex-col gap-y-4 w-full h-full my-10">
                  <label className="flex flex-col gap-y-2">
                    Vraag
                    <Input name="name" styles="w-full" placeholder="Naam" value={name} onChange={(e) => setName(e.target.value)} />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-neutral-700 px-4 py-3 sm:flex gap-x-2 sm:flex-row-reverse sm:px-6">
            <Button
              name="Aanmaken"
              type="submit"
              disabled={disabled || name.length === 0}
              styles="!text-sm disabled:!bg-gray-400 font-medium ring-offset-0 ring-0 !ring-offset-neutral-700 focus:!ring-offset-2 focus:!ring-2"
            />
            <Button
              name="Annuleren"
              onClick={() => setModalOpen(false)}
              styles="!text-sm font-medium !bg-gray-500 hover:!bg-gray-400 ring-offset-0 ring-0 !ring-offset-neutral-700 focus:!ring-offset-2 focus:!ring-2"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
