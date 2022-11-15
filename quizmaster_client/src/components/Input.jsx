import React from 'react';

function Input(props) {
  const {
    type = 'text', name, value, onChange, placeholder,
  } = props;

  return (
    <input
      className="text-lg border border-gray-300 bg-gray-100 p-2 ring-2 outline-none
    ring-offset-2 ring-transparent focus:ring-indigo-500 rounded-md"
      onChange={onChange}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default Input;
