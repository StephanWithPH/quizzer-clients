import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import fetcher from '../../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

function EditCategory() {
  const { id } = useParams();

  const [category, setCategory] = useState('');
  const [DBCategory, setDBCategory] = useState('');
  const [disabled, setDisabled] = useState(false);

  const fetchCategory = () => {
    fetcher(`${serverURL}/api/v1/manage/categories/${id}`, {
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Er is iets fout gegaan');
      }

      return res.json();
    })
      .then((data) => {
        setDBCategory(data);

        setCategory(data.name);
      })
      .catch((err) => {
        toastr.error(err.message);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    fetcher(`${serverURL}/api/v1/manage/categories/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: category,
      }),
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => { throw new Error(text); });
      }

      fetchCategory();
      return toastr.success('Categorie succesvol bijgewerkt');
    }).catch((err) => {
      const message = JSON.parse(err.message).error;
      toastr.error(message || 'Er is iets fout gegaan');
    }).finally(() => {
      setDisabled(false);
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-10">
        <div className="w-full flex items-center">
          <h1 className="text-2xl font-medium">Bewerk Vraag</h1>
        </div>
        <div className="w-full 2xl:w-2/3 dark:text-white rounded-md flex flex-col px-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 dark:text-white text-gray-900">Informatie</h3>
                <p className="mt-1 text-sm dark:text-gray-400 text-gray-600">
                  Vul hier de naam van de categorie.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6 dark:bg-neutral-800">
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="question" className="block text-lg font-medium dark:text-white text-gray-700">
                        Naam
                        <sup className="text-indigo-500 font-medium text-xl left-1 -top-px">*</sup>
                      </label>
                      <Input
                        value={category}
                        placeholder={DBCategory?.name}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <p className="text-sm dark:text-gray-300 text-gray-500">
                        Vul hierboven de vraag die gesteld zal worden in.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-neutral-800 px-4 py-6 flex items-center justify-end">
                      <Button
                        type="submit"
                        name="Opslaan"
                        disabled={disabled || category === '' || category === DBCategory?.name}
                        className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditCategory;
