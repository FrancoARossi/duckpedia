import React from "react";

type InputTextAreaProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  placeholder?: string;
};

const TextArea: React.FC<InputTextAreaProps> = ({
  onChange,
  defaultValue = "",
  placeholder = "Search...",
}) => {
  const [value, setValue] = React.useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <textarea
      placeholder={placeholder}
      className="h-20 w-[80%] cursor-text resize-none rounded-md border border-gray-300 bg-transparent px-2 before:content-[attr(placeholder)] focus-visible:border-gray-400 focus-visible:outline-none"
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextArea;
