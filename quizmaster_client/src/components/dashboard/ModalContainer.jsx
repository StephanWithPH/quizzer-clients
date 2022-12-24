import React, { useEffect, useRef } from 'react';

function ModalContainer({ setModalOpen, children }) {
  const ref = useRef(null);

  const handleClick = (e) => {
    if (ref.current === e.target) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div ref={ref} className="fixed z-50 inset-0 h-screen bg-black/75">
        <div className="fixed inset-0 top-1/2 lg:left-1/2 lg:-translate-x-1/2 -translate-y-1/2 z-10
        lg:w-2/3 h-full lg:h-fit flex items-center justify-center overflow-hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
