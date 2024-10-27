interface ButtonProps {
  type?: "button" | "submit" | "reset";
  styles?: string;
  name: string;
  onClick?: () => void;
}

function Button({ type = "button", styles, name, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex self-center border-none dark:disabled:bg-neutral-400 disabled:bg-gray-300 outline-none
      font-bold justify-center ring-2 dark:ring-offset-neutral-800 ring-offset-2 ring-indigo-500 dark:disabled:ring-neutral-300 disabled:ring-gray-300 
      bg-indigo-500 text-white py-2 px-3 rounded-md ${styles}`}
    >
      {name}
    </button>
  );
}

export default Button;
