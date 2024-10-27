import { ChangeEvent } from 'react';

interface InputProps {
    type?: string;
    styles: string;
    disabled?: boolean;
    name: string;
    value: string | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}
function Input({ type = 'text', styles, disabled = false, name, value, onChange, placeholder }: InputProps) {
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
