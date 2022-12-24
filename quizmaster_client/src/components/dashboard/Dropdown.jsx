import React from 'react';

function Dropdown({
  name, options, value, onChange,
}) {
  return (
    <select
      className="text-lg dark:text-white text-black border border-gray-300 dark:border-neutral-500 bg-gray-100 dark:bg-neutral-600 p-2 ring-2 outline-none
    ring-offset-2 dark:ring-offset-neutral-800 ring-transparent focus:ring-indigo-500 rounded-md"
      value={value}
      name={name}
      onChange={onChange}
    >
      <option value="0" disabled>Maak een keuze</option>
      {options.length > 0 && options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
