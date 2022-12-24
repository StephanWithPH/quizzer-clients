import React from 'react';
import { Minimize } from 'react-feather';

function ImagePreview({ handleClose, image }) {
  return (
    <div className="flex justify-center items-center max-h-[95vh] max-w-[95vw] overflow-hidden w-full h-full rounded-xl">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center group cursor-pointer duration-200 transition-all rounded-xl hover:bg-neutral-700/50"
      >
        <Minimize
          size={80}
          className="text-white transition-all opacity-0
        pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        />
      </button>
      <img src={image} alt="preview" className="w-full h-full object-cover" />
    </div>
  );
}

export default ImagePreview;
