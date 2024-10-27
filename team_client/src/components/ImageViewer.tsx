import { MouseEvent } from 'react';
import { X } from 'react-feather';

interface ImageViewerProps {
    url: string;
    onClose: () => void;
}

function ImageViewer({ url, onClose }: ImageViewerProps) {
    function handleCloseEvent() {
        onClose();
    }

    function handleBackgroundCloseEvent(e: MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            handleCloseEvent();
        }
    }

    return (
        <div className="fixed w-full z-10 h-screen top-0 left-0 bg-black/75">
            <div className="absolute top-4 right-4">
                <X size={24} onClick={() => handleCloseEvent()} className="text-white hover:text-gray-200" />
            </div>
            {}
            <div className="w-full h-full flex justify-center items-center" onClick={(e) => handleBackgroundCloseEvent(e)}>
                <img className="max-w-[80%] max-h-[80%]" src={url} alt="Question" />
            </div>
        </div>
    );
}

export default ImageViewer;
