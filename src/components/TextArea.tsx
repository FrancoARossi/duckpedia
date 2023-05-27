import React from "react";

type InputTextAreaProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
};

const TextArea: React.FC<InputTextAreaProps> = ({
  onChange,
  defaultValue = "",
  placeholder = "Search...",
  maxLength,
}) => {
  const [value, setValue] = React.useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="relative flex w-[90%] justify-center">
      <textarea
        placeholder={placeholder}
        className="h-20 w-full cursor-text resize-none rounded-md border border-gray-300 bg-transparent px-4 py-2 before:content-[attr(placeholder)] focus-visible:border-gray-400 focus-visible:outline-none"
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      {typeof maxLength === "number" ? (
        <span
          className={`absolute font-semibold bottom-0 right-0 translate-y-6${
            value.length === maxLength ? " text-red-400" : " text-black/40"
          }`}
        >
          {value.length}/{maxLength}
        </span>
      ) : null}
    </div>
  );
};

export default TextArea;
