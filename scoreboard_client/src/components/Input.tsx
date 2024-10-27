interface InputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  styles?: string;
}
function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  styles,
}: InputProps) {
  return (
    <input
      className={`${styles} text-lg border dark:ring-offset-neutral-600 focus:border-none dark:bg-neutral-600 border-gray-300 bg-gray-100 p-2 ring-2 outline-none
    ring-offset-2 ring-transparent focus:ring-indigo-500 rounded-md`}
      onChange={onChange}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default Input;
