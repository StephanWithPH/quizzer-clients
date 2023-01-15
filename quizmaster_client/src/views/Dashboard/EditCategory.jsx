import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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

  const fetchCategory = async () => {
    await toast.promise(
      fetcher(`${serverURL}/api/v1/manage/categories/${id}`, {
        credentials: 'include',
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }

        return res.json();
      }),
      {
        pending: 'Categorie ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is iets fout gegaan met het ophalen van de categorie';
          },
        },
      },
    ).then((data) => {
      setDBCategory(data);

      setCategory(data.name);
    });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    await toast.promise(
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
          return res.text().then((text) => {
            throw new Error(text);
          });
        }

        return res.json();
      }),
      {
        pending: 'Categorie bijwerken...',
        success: 'Categorie succesvol bijgewerkt',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is iets fout gegaan met het bijwerken van de categorie';
          },
        },
      },
    ).then(() => fetchCategory())
      .finally(() => setDisabled(false));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-10">
        <div className="w-full flex items-center">
          <h1 className="text-2xl font-medium">Bewerk Categorie</h1>
        </div>
        <div className="w-full 2xl:w-2/3 dark:text-white rounded-md flex flex-col px-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 dark:text-white text-gray-900">Informatie</h3>
                <p className="mt-1 text-sm dark:text-gray-400 text-gray-600">
                  Vul hier de gegevens van de categorie in.
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
                        Vul hier de naam van de categorie in.
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
