import React from 'react';

function TextArea({
  name, onChange, placeholder, value, styles,
}) {
  return (
    <textarea
      className={`text-lg dark:text-white text-black border border-gray-300 dark:border-neutral-500 bg-gray-100 dark:bg-neutral-600 p-2 ring-2 outline-none
    ring-offset-2 dark:ring-offset-neutral-800 ring-transparent focus:ring-indigo-500 rounded-md ${styles}`}
      name={name}
      rows={4}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default TextArea;
