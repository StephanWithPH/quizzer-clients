import React from 'react';
import { X } from 'react-feather';

function ImageViewer(props) {
  const {
    url,
    onClose,
  } = props;

  function handleCloseEvent() {
    onClose();
  }

  function handleBackgroundCloseEvent(e) {
    if (e.target === e.currentTarget) {
      handleCloseEvent(e);
    }
  }

  return (
    <div className="fixed w-full z-10 h-screen top-0 left-0 bg-black/75">
      <div className="absolute top-4 right-4">
        <X size={24} onClick={(e) => handleCloseEvent(e)} className="text-white hover:text-gray-200" />
      </div>
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="w-full h-full flex justify-center items-center" onClick={(e) => handleBackgroundCloseEvent(e)}>
        <img className="max-w-[80%] max-h-[80%]" src={url} alt="Question" />
      </div>
    </div>

  );
}

export default ImageViewer;
