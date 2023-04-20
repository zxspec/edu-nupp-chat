type Props = {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ placeholder, value, disabled, onChange }: Props) => (
  <input
    disabled={disabled}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    type="checkbox"
    className="
      p-4 
      text-lg 
      bg-black 
      border-2 
      border-neutral-800 
      rounded-md 
      outline-none 
      text-white
      focus:border-sky-500
      focus:border-2
      scale-150
      transition
      disabled:bg-neutral-900
      disabled:opacity-70
      disabled:cursor-not-allowed
    "
  />
);
