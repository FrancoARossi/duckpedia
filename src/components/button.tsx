import React from "react";

type ButtonProps = {
  label?: string;
  children?: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  label = "",
  children,
  onClick,
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <div
      className={`${!!className ? `${className} ` : ""}${
        disabled ? "opacity-50 pointer-events-none " : ""
      }cursor-pointer min-w-[8rem] rounded-md border-2 border-solid bg-yellow-300 p-3 font-semibold text-gray-800 transition-colors hover:bg-yellow-400 hover:text-gray-900`}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children || label}
    </div>
  );
};

export default Button;
