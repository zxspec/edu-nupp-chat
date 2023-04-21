import { useCallback, useState } from "react";

type Props = {
  placeholder?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  placeholder,
  checked,
  disabled,
  onChange,
}: Props) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked);
      onChange(event);
    },
    [onChange]
  );

  return (
    <input
      type="checkbox"
      disabled={disabled}
      onChange={onChangeHandler}
      placeholder={placeholder}
      checked={isChecked}
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
};
