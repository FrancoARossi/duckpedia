import React from "react";

type InputTextProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  placeholder?: string;
};

const InputText: React.FC<InputTextProps> = ({
  onChange,
  defaultValue = "",
  placeholder = "Search...",
}) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <input
      placeholder={placeholder}
      className="h-9 w-56 cursor-text rounded-md border border-gray-300 bg-transparent px-2 before:content-[attr(placeholder)] focus-visible:border-gray-400 focus-visible:outline-none"
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputText;
