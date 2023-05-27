import type { MouseEvent, ReactElement } from "react";

type CardProps = {
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  content?: ReactElement;
  children?: ReactElement;
  disableDefaultHover?: boolean;
};

const Card: React.FC<CardProps> = ({
  className = "",
  content,
  children,
  onClick,
  disableDefaultHover,
  ...rest
}) => (
  <div
    className={`rounded-md bg-slate-50 px-6 py-3 shadow-lg transition-all${disableDefaultHover ? "" : " hover:scale-105 hover:shadow-2xl"} ${className}`}
    onClick={onClick}
    {...rest}
  >
    {content || children}
  </div>
);

export default Card;
