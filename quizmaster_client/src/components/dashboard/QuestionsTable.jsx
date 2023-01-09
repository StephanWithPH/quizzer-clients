import React, { useState } from 'react';
import { Image, Maximize } from 'react-feather';
import toastr from 'toastr';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import fetcher from '../../fetcher';
import ModalContainer from './ModalContainer';
import ImagePreview from './Modals/ImagePreview';
import { getTotalAmountsActionAsync } from '../../actions/sideBarActionCreator';
import { getQuestionsActionAsync } from '../../actions/dashboardActionCreator';

const serverURL = process.env.REACT_APP_API_URL;

function QuestionsTable() {
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const { questions } = useSelector((state) => state.dashboard);

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

      dispatch(getTotalAmountsActionAsync());
      dispatch(getQuestionsActionAsync());
      return toastr.success('Vraag verwijderd');
    }).catch((err) => {
      const message = JSON.parse(err.message).error;
      toastr.error(message);
    });
  };

  return (
    <>
      <table className="w-full rounded-md overflow-hidden table-fixed">
        <thead>
          <tr className="text-left bg-indigo-300 dark:bg-indigo-400">
            <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider">
              Vraag
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider">
              Antwoord
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider">
              Datum bijgewerkt
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider w-56">
              Categorie
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider w-44">
              Afbeelding
            </th>
            <th className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider w-44">
              Acties
            </th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id} className="px-6 py-4 even:bg-indigo-50 odd:bg-indigo-100 dark:text-white dark:odd:bg-neutral-700 dark:bg-neutral-800">
              <td className="px-6 py-4 mx-auto w-full text-ellipsis whitespace-nowrap overflow-hidden">
                {question.question}
              </td>
              <td className="px-6 py-4 w-full text-ellipsis whitespace-nowrap overflow-hidden">
                {question.answer}
              </td>
              <td className="px-6 py-4 w-full text-ellipsis whitespace-nowrap overflow-hidden">
                -
              </td>
              <td className="px-6 py-4 capitalize">
                {new Date(question.date).toLocaleDateString('nl-NL', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                })}
              </td>
              <td className="px-6 py-4">
                <div className="bg-indigo-300/30 text-sm font-medium px-3 py-1 flex items-center justify-center
                text-indigo-500 dark:text-indigo-200 w-fit rounded-full text-center"
                >
                  {question.category.name}
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
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/dashboard/vragen/${question._id}`}
                  >
                    Bewerken
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteQuestion(question._id)}
                    className="text-left text-red-400"
                  >
                    Verwijderen
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
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
