import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Maximize, RefreshCw } from 'react-feather';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getImagesActionAsync } from '../../actions/dashboardActionCreator';
import ModalContainer from '../../components/dashboard/ModalContainer';
import ImagePreview from '../../components/dashboard/Modals/ImagePreview';
import Button from '../../components/Button';
import useScrollPosition from '../../hooks/scrollposition';

const serverURL = process.env.REACT_APP_API_URL;
const limit = 12;
function Images() {
  const dispatch = useDispatch();

  const scrollPosition = useScrollPosition();
  const [timesPressed, setTimesPressed] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { images, totalImageCount } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getImagesActionAsync(timesPressed, limit));
  }, []);

  const handlePreview = (image) => {
    setPreviewImage(`${serverURL}/static/images/teams/${image}`);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setPreviewImage(null);
  };

  const handleLoadMore = () => {
    setTimesPressed(timesPressed + 1);
    dispatch(getImagesActionAsync(timesPressed + 1, limit));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="font-bold text-xl">Team Foto&apos;s</h1>
          <h3 className="font-medium text-lg text-neutral-400">Bewonder foto&apos;s die teams hebben geüpload</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {images.map((image) => (
            <button
              key={image}
              onClick={() => handlePreview(image)}
              className="w-full h-full rounded-xl overflow-hidden group
            h-[20rem] relative bg-gray-300 dark:bg-neutral-700 shadow-lg"
            >
              <div className="absolute z-20 w-full h-full bg-neutral-700/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center">
                <Maximize className="absolute w-8 h-8 text-white group-hover:opacity-100 opacity-0 transition-all duration-300" />
              </div>

              <LazyLoadImage
                src={`${serverURL}/static/images/teams/${image}`}
                wrapperClassName="w-full h-full z-10 overflow-hidden lazy-load-container"
                alt="team"
                scrollPosition={scrollPosition}
                effect="blur"
              />
            </button>
          ))}
        </div>
        {(totalImageCount - (limit * timesPressed) > 0) && <Button icon={<RefreshCw />} onClick={handleLoadMore} />}
      </div>
      {showModal && (
        <ModalContainer setModalOpen={setShowModal}>
          <ImagePreview handleClose={handleClose} image={previewImage} />
        </ModalContainer>
      )}
    </DashboardLayout>
  );
}

export default trackWindowScroll(Images);
