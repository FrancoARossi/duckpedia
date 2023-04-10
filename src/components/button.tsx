import React from "react";

type ButtonProps = {
  label?: string;
  children?: React.ReactNode | string;
  onClick?: () => void;
};

const Button = ({ label = "", children, onClick }: ButtonProps) => {
  return (
    <div
      className="cursor-pointer rounded-md border-2 border-solid bg-yellow-300 p-3 font-semibold text-gray-800 transition-colors hover:bg-yellow-400 hover:text-gray-900"
      onClick={onClick}
    >
      {children || label}
    </div>
  );
};

export default Button;
