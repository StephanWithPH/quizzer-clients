import React from 'react';

function Input(props) {
  const {
    type = 'text', name, value, onChange, placeholder, styles, reference,
  } = props;

  return (
    <input
      className={`text-lg text-black border border-gray-300 bg-gray-100 p-2 ring-2 outline-none
    ring-offset-2 ring-transparent focus:ring-indigo-500 rounded-md ${styles}`}
      onChange={onChange}
      type={type}
      name={name}
      value={value}
      ref={reference}
      placeholder={placeholder}
    />
  );
}

export default Input;
