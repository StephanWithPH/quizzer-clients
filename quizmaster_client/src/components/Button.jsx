import React from 'react';

function Button(props) {
  const {
    type = 'button', disabled = false, styles, name, onClick,
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex self-center border-none dark:disabled:bg-neutral-400 disabled:bg-gray-300 outline-none
      font-bold justify-center ring-2 bg-gray-100 dark:ring-offset-neutral-800 ring-offset-2 ring-indigo-500 dark:disabled:ring-neutral-300 disabled:ring-gray-300 
      self-center bg-indigo-500 text-white py-2 px-3 rounded-md ${styles}`}
    >
      {name}
    </button>
  );
}

export default Button;
