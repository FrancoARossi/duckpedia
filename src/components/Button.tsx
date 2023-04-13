import { useReducer, type ReactNode, useRef, SyntheticEvent } from "react";

type ButtonProps = {
  label?: string;
  children?: ReactNode | string;
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!onClick && buttonRef.current) {
      buttonRef.current.click();
    } else {
      onClick?.();
    }
  };

  return (
    <div
      className={`${!!className ? `${className} ` : ""}${
        disabled ? "pointer-events-none opacity-50 " : ""
      }cursor-pointer min-w-[8rem] rounded-md border-2 border-solid bg-yellow-300 p-3 text-center font-semibold text-gray-800 transition-colors hover:bg-yellow-400 hover:text-gray-900`}
      onClick={disabled ? undefined : handleClick}
      {...rest}
    >
      <button ref={buttonRef} className="hidden" type="submit" />
      {children || label}
    </div>
  );
};

export default Button;
