import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AlertOctagon, Image, Plus, X,
} from 'react-feather';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import fetcher from '../../fetcher';
import Input from '../../components/Input';
import TextArea from '../../components/dashboard/TextArea';
import Button from '../../components/Button';
import Dropdown from '../../components/dashboard/Dropdown';

const serverURL = process.env.REACT_APP_API_URL;

const acceptStyle = 'border-2 !border-green-500 !bg-green-300/25';
const rejectStyle = 'border-2 !border-red-500 !bg-red-400/25';
function EditQuestion() {
  const { id } = useParams();

  const [DBQuestion, setDBQuestion] = useState();
  const [categories, setCategories] = useState([]);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');

  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();

  const {
    isDragAccept,
    isDragReject,
    getRootProps,
  } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const thumb = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setPreviewImage(thumb);
    },
  });

  useEffect(() => {
    // fetch categories
    fetcher(`${serverURL}/api/v1/manage/categories`, {
      credentials: 'include',
    }).then((res) => res.json())
      .then((data) => {
        const mappedCategories = data.map((cat) => cat.name);
        setCategories(mappedCategories);
      });
  }, []);

  const fetchQuestion = async () => {
    await toast.promise(
      fetcher(`${serverURL}/api/v1/manage/questions/${id}`, {
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
        pending: 'Vraag ophalen...',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is iets fout gegaan met het ophalen van de vraag';
          },
        },
      },
    ).then((data) => {
      setDBQuestion(data);

      setQuestion(data.question);
      setAnswer(data.answer);
      setCategory(data.category.name);
      setImage(data.image);
    });
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleInformationSubmit = async (e) => {
    e.preventDefault();

    await toast.promise(
      fetcher(`${serverURL}/api/v1/manage/questions/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
          category,
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
        pending: 'De vraag wordt bijgewerkt',
        success: 'De vraag is succesvol bijgewerkt',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is iets fout gegaan met het bijwerken de vraag';
          },
        },
      },
    ).then(() => {
      fetchQuestion();
    });
  };

  function fileToBase64(file) {
    if (file) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }
    return null;
  }

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    await toast.promise(
      fetcher(`${serverURL}/api/v1/manage/questions/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64Image: await fileToBase64(previewImage),
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => { throw new Error(text); });
          }

          return res.json();
        }),
      {
        pending: 'De afbeelding wordt bijgewerkt',
        success: 'De afbeelding is succesvol bijgewerkt',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is iets fout gegaan met het bijwerken van de afbeelding';
          },
        },
      },
    ).then(() => {
      setPreviewImage(null);
      fetchQuestion();
    });
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
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
                  Vul hier de informatie in van de vraag.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleInformationSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6 dark:bg-neutral-800">
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="question" className="block text-lg font-medium dark:text-white text-gray-700">
                        Vraag
                        <sup className="text-indigo-500 font-medium text-xl left-1 -top-px">*</sup>
                      </label>
                      <TextArea
                        value={question}
                        placeholder={DBQuestion?.question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                      <p className="text-sm dark:text-gray-300 text-gray-500">
                        Vul hierboven de vraag die gesteld zal worden in.
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="question" className="block text-lg font-medium dark:text-white text-gray-700">
                        Antwoord
                        <sup className="text-indigo-500 font-medium text-xl left-1 -top-px">*</sup>
                      </label>
                      <Input
                        value={answer}
                        placeholder={DBQuestion?.answer}
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                      <p className="text-sm dark:text-gray-300 text-gray-500">
                        Vul hierboven het antwoord op de vraag in.
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="question" className="block text-lg font-medium dark:text-white text-gray-700">
                        Categorie
                        <sup className="text-indigo-500 font-medium text-xl left-1 -top-px">*</sup>
                      </label>
                      <Dropdown name="Categorie" value={category} onChange={handleChangeCategory} options={categories} />
                      <p className="text-sm dark:text-gray-300 text-gray-500">
                        Kies hierboven de categorie van de vraag.
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-neutral-800 px-4 py-6 flex items-center justify-end">
                    <Button
                      type="submit"
                      name="Opslaan"
                      disabled={!question
                        || !answer
                        || !category
                        || question === DBQuestion?.question
                        && answer === DBQuestion?.answer
                        && category === DBQuestion?.category.name}
                      className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full 2xl:w-2/3 dark:text-white rounded-md flex flex-col px-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 dark:text-white text-gray-900">Afbeelding</h3>
                <p className="mt-1 text-sm dark:text-gray-400 text-gray-600">
                  De afbeelding die bij de vraag hoort.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleImageSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6 dark:bg-neutral-800">
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="question" className="block text-lg font-medium dark:text-white text-gray-700">Afbeelding</label>
                      {image ? (
                        <div className="relative group w-44 h-44 overflow-hidden bg-neutral-500 rounded-xl border border-white">
                          <img
                            className="object-cover w-full h-full"
                            src={`${serverURL}/${image}`}
                            alt={question}
                          />
                          <div className="absolute transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100
                           group-hover:pointer-events-auto w-full h-full z-20 bg-neutral-800/80 top-0 left-0 flex justify-center items-center"
                          >
                            <X size={80} className="text-white" onClick={() => setImage(undefined)} />
                          </div>
                        </div>
                      ) : (
                        previewImage ? (
                          <div className="relative group w-44 h-44 overflow-hidden bg-neutral-500 rounded-xl border border-white">
                            <img
                              className="object-cover w-full h-full"
                              src={previewImage?.preview}
                              alt={previewImage?.name}
                              // Revoke data uri after image is loaded
                              onLoad={() => { URL.revokeObjectURL(previewImage?.preview); }}
                            />
                            <div className="absolute transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100
                           group-hover:pointer-events-auto w-full h-full z-20 bg-neutral-800/80 top-0 left-0 flex justify-center items-center"
                            >
                              <X size={80} className="text-white" onClick={() => setPreviewImage(undefined)} />
                            </div>
                          </div>
                        ) : (
                          <div
                            {
                            ...getRootProps({
                              className: `flex justify-center items-center bg-indigo-300/25 hover:bg-indigo-200/25 transition-all 
                          px-4 py-24 rounded-xl border-dashed border-2 border-indigo-500 
                          ${isDragAccept && acceptStyle || isDragReject && rejectStyle}`,
                            })
                          }
                          >
                            {isDragAccept ? (
                              <Plus size={30} strokeWidth={2} className="text-green-500" />
                            ) : (
                              isDragReject ? (
                                <AlertOctagon size={30} strokeWidth={2} className="text-red-500" />
                              ) : (
                                <Image size={30} strokeWidth={2} className="text-indigo-400" />
                              )
                            )}
                          </div>
                        )
                      )}
                      <p className="text-sm dark:text-gray-300 text-gray-500">
                        De afbeelding die bij de vraag getoond zal worden.
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-neutral-800 px-4 py-6 flex items-center gap-x-6 justify-end">
                    <Button
                      type="submit"
                      name="Opslaan"
                      disabled={DBQuestion?.image === image && !previewImage}
                      className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                    />
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

export default EditQuestion;
