import React, { useEffect, useState } from 'react';
import {
  AlertOctagon, Image, Plus, X,
} from 'react-feather';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../../Button';
import Input from '../../Input';
import Dropdown from '../Dropdown';
import fetcher from '../../../fetcher';
import { getTotalAmountsActionAsync } from '../../../actions/sideBarActionCreator';
import { getQuestionsActionAsync } from '../../../actions/dashboardActionCreator';

const serverURL = process.env.REACT_APP_API_URL;

const acceptStyle = 'border-2 !border-green-500 !bg-green-300/25';
const rejectStyle = 'border-2 !border-red-500 !bg-red-400/25';

function NewQuestion({ setModalOpen }) {
  const dispatch = useDispatch();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('0');
  const [image, setImage] = useState();

  const [categories, setCategories] = useState([]);
  const [disabled, setDisabled] = useState(false);

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
      const previewImage = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setImage(previewImage);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    await toast.promise(
      fetcher(`${serverURL}/api/v1/manage/questions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
          category,
          base64Image: await fileToBase64(image),
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
        pending: 'Bezig met opslaan...',
        success: 'Vraag opgeslagen',
        error: {
          render({ data }) {
            return JSON.parse(data.message).error || 'Er is iets fout gegaan met het aanmaken van de vraag';
          },
        },
      },
    ).then(() => {
      setModalOpen(false);
      dispatch(getTotalAmountsActionAsync());
      dispatch(getQuestionsActionAsync());
    }).finally(() => {
      setDisabled(false);
    });
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <form className="w-full h-full lg:w-2/3" onSubmit={handleSubmit}>
        <div className="relative overflow-hidden rounded-lg text-left shadow-xl transition-all w-full">
          <div className="bg-white dark:bg-neutral-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full flex items-center gap-x-4">
                <div className="w-fit flex p-4 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-300">
                  <Plus size={30} strokeWidth={2} className="text-indigo-500 dark:text-indigo-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium leading-6 dark:text-white text-gray-900" id="modal-title">Vraag aanmaken</h3>
                  <p className="dark:text-gray-400 text-gray-500">
                    Maak hier een nieuwe vraag aan die in de quiz gesteld kan worden.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center w-full items-center gap-y-4">
                <div className="flex flex-col gap-y-4 w-full h-full my-4">
                  <label className="flex flex-col gap-y-2">
                    Vraag
                    <Input name="question" styles="w-full" placeholder="Vraag" value={question} onChange={(e) => setQuestion(e.target.value)} />
                  </label>
                  <label className="flex flex-col gap-y-2">
                    Antwoord
                    <Input name="Antwoord" placeholder="Antwoord" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                  </label>
                  <label className="flex flex-col gap-y-2">
                    Categorie
                    <Dropdown name="Categorie" value={category} onChange={handleChangeCategory} options={categories} />
                  </label>
                  <label className="flex flex-col gap-y-2">
                    Afbeelding
                    {image ? (
                      <div className="relative group w-44 h-44 overflow-hidden bg-neutral-500 rounded-xl border border-white">
                        <img
                          className="object-cover w-full h-full"
                          src={image.preview}
                          alt={image.name}
                          // Revoke data uri after image is loaded
                          onLoad={() => { URL.revokeObjectURL(image.preview); }}
                        />
                        <div className="absolute transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100
                         group-hover:pointer-events-auto w-full h-full z-20 bg-neutral-800/80 top-0 left-0 flex justify-center items-center"
                        >
                          <X size={80} className="text-white" onClick={() => setImage(undefined)} />
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
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-neutral-700 px-4 py-3 sm:flex gap-x-2 sm:flex-row-reverse sm:px-6">
            <Button
              name="Aanmaken"
              type="submit"
              disabled={disabled || question === '' || answer === '' || category === '0'}
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

export default NewQuestion;
