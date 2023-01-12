import React, { useEffect, useState } from 'react';
import { Maximize, Plus, Trash2 } from 'react-feather';
import toastr from 'toastr';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ModalContainer from '../../components/dashboard/ModalContainer';
import ImagePreview from '../../components/dashboard/Modals/ImagePreview';
import { getPlaceholderImagesActionAsync } from '../../actions/dashboardActionCreator';
import useScrollPosition from '../../hooks/scrollposition';
import fetcher from '../../fetcher';
import CreatePlaceholder from '../../components/dashboard/Modals/CreatePlaceholder';
import { getTotalAmountsActionAsync } from '../../actions/sideBarActionCreator';

const serverURL = process.env.REACT_APP_API_URL;
function Placeholders() {
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition();

  const { placeholders } = useSelector((state) => state.dashboard);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(getPlaceholderImagesActionAsync());
  }, []);

  const handlePreview = (image) => {
    setPreviewImage(`${serverURL}/${image}`);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setPreviewImage(null);
  };

  const handleDelete = (image) => {
    const name = image.split('/').pop().replace(/\.[^/.]+$/, '');
    fetcher(`${serverURL}/api/v1/manage/images/placeholder/${name}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Er is iets fout gegaan');
      }

      return res.json();
    }).then(() => {
      toastr.success('Afbeelding verwijderd');
      dispatch(getTotalAmountsActionAsync());
      dispatch(getPlaceholderImagesActionAsync());
    })
      .catch((err) => {
        toastr.error(err.message);
      });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="font-bold text-xl">Placeholder afbeeldingen</h1>
            <h3 className="font-medium text-lg text-neutral-400">Placeholder afbeeldingen voor teams die geen afbeelding uploaden</h3>
          </div>
          <div>
            <Plus
              size={45}
              className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-400 transition-all text-white cursor-pointer"
              onClick={() => setShowCreateModal(true)}
            />
          </div>
        </div>
        {placeholders.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {placeholders.map((placeholder) => (
              <div
                key={placeholder}
                className="w-full h-full rounded-xl overflow-hidden group
            h-[20rem] relative bg-gray-300 dark:bg-neutral-700 shadow-lg"
              >
                <button
                  onClick={() => handleDelete(placeholder)}
                  className="absolute z-30 top-0 right-0 p-2 rounded-bl-md bg-black dark:bg-neutral-600 group-hover:bg-white transition-all cursor-pointer"
                >
                  <Trash2 className="transition-all group-hover:text-red-500 text-white" />
                </button>
                <button
                  className="w-full h-full"
                  onClick={() => handlePreview(placeholder)}
                >
                  <div className="absolute z-20 w-full h-full bg-neutral-700/50 opacity-0
                  group-hover:opacity-100 transition-all duration-300 flex justify-center items-center"
                  >
                    <Maximize className="absolute w-8 h-8 text-white group-hover:opacity-100 opacity-0 transition-all duration-300" />
                  </div>

                  <LazyLoadImage
                    src={`${serverURL}/${placeholder}`}
                    wrapperClassName="w-full h-full z-10 overflow-hidden lazy-load-container"
                    alt="team"
                    scrollPosition={scrollPosition}
                    effect="blur"
                  />
                </button>

              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-2/3 border-2 border-dashed dark:bg-neutral-900 flex items-center justify-center border-gray-300
            dark:border-neutral-700 rounded-md h-96"
            >
              <p>Er zijn nog geen placeholders.</p>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <ModalContainer setModalOpen={setShowModal}>
          <ImagePreview handleClose={handleClose} image={previewImage} />
        </ModalContainer>
      )}

      {showCreateModal && (
        <ModalContainer setModalOpen={setShowCreateModal}>
          <CreatePlaceholder setModalOpen={setShowCreateModal} />
        </ModalContainer>
      )}
    </DashboardLayout>
  );
}

export default Placeholders;
