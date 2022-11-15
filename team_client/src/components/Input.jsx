import React from 'react';

function Input(props) {
  const {
    type = 'text', styles, disabled, name, value, onChange, placeholder,
  } = props;

  return (
    <input
      disabled={disabled}
      className={`${styles} text-lg disabled:bg-gray-300 disabled:text-gray-400 disabled:placeholder-gray-400 dark:bg-neutral-600
    border border-gray-300 focus:border-transparent dark:ring-offset-neutral-600 bg-gray-100 p-2 ring-2 outline-none ring-offset-2 ring-transparent focus:ring-indigo-500 rounded-md`}
      onChange={onChange}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default Input;
