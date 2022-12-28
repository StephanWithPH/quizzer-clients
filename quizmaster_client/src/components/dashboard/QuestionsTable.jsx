import React, { useState } from 'react';
import { Image, Maximize } from 'react-feather';
import toastr from 'toastr';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../Button';
import fetcher from '../../fetcher';
import ModalContainer from './ModalContainer';
import ImagePreview from './Modals/ImagePreview';

const serverURL = process.env.REACT_APP_API_URL;

function QuestionsTable() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const questions = useSelector((state) => state.dashboard.questions);

  const handlePreview = (src) => {
    setPreviewOpen(true);
    setPreviewImage(src);
  };

  const handleClose = () => {
    setPreviewOpen(false);
    setPreviewImage('');
  };

  const deleteQuestion = (id) => {
    fetcher(`${serverURL}/api/v1/manage/questions/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => { throw new Error(text); });
      }

      return toastr.success('Vraag verwijderd');
    }).catch((err) => {
      const message = JSON.parse(err.message).error;
      toastr.error(message);
    });
  };

  return (
    <>
      <table className="w-full dark:text-white rounded-md overflow-hidden table-fixed">
        <thead>
          <tr className="text-left bg-indigo-300 dark:bg-indigo-500">
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider 3xl:w-1/3">
              Vraag
            </th>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
              Antwoord
            </th>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
              Datum bijgewerkt
            </th>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
              Categorie
            </th>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider w-32">
              Afbeelding
            </th>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
              Acties
            </th>
          </tr>
          {questions.map((question) => (
            <tr key={question._id} className="px-6 py-4 even:bg-indigo-50 odd:bg-indigo-100 dark:odd:bg-neutral-700 dark:bg-neutral-800">
              <td className="px-6 py-4 mx-auto w-full text-ellipsis whitespace-nowrap overflow-hidden">
                {question.question}
              </td>
              <td className="px-6 py-4 w-full text-ellipsis whitespace-nowrap overflow-hidden">
                {question.answer}
              </td>
              <td className="px-6 py-4 capitalize">
                {new Date(question.date).toLocaleDateString('nl-NL', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                })}
              </td>
              <td className="px-6 py-4">
                <div className="bg-indigo-300/30 border-2 font-medium px-6 py-2 flex items-center justify-center
                border-indigo-500 text-indigo-500 dark:text-indigo-400 w-fit rounded-full"
                >
                  {question.category}
                </div>
              </td>
              <td className="py-4 w-24 h-24 group mx-auto flex items-center justify-center">
                {question.image ? (
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <button
                      type="button"
                      onClick={() => handlePreview(`${serverURL}/${question.image}`)}
                      aria-label="preview image"
                      className="w-full h-full absolute pointer-events-none opacity-0 flex items-center justify-center
                      group-hover:pointer-events-auto group-hover:opacity-100 bg-neutral-700/50 transition-all"
                    >
                      <Maximize className="absolute w-8 h-8 text-white" />
                    </button>
                    <img src={`${serverURL}/${question.image}`} alt="question" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <Image className="text-gray-400" />
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-4">
                  <Link
                    to={`/dashboard/vragen/${question._id}`}
                    className="bg-indigo-500 hover:bg-indigo-400 ring-indigo-500 hover:ring-indigo-400
                transition-all text-white py-2 px-3 rounded-md font-bold justify-center ring-2 dark:ring-offset-neutral-800 ring-offset-2"
                  >
                    Bewerken
                  </Link>
                  <Button name="Verwijderen" styles="!bg-red-500 hover:!bg-red-400 ring-red-500 hover:ring-red-400" onClick={() => deleteQuestion(question._id)} />
                </div>
              </td>
            </tr>
          ))}
        </thead>
      </table>
      {previewOpen && (
        <ModalContainer setModalOpen={setPreviewOpen}>
          <ImagePreview handleClose={handleClose} image={previewImage} />
        </ModalContainer>
      )}
    </>
  );
}

export default QuestionsTable;
