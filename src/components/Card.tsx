import { type ReactElement } from "react";

type CardProps = {
  className?: string;
  content?: ReactElement;
  children?: ReactElement;
};

const Card: React.FC<CardProps> = ({ className = "", content, children }) => (
  <div
    className={`rounded-md bg-slate-50 px-6 py-3 shadow-lg transition-all hover:scale-105 hover:shadow-2xl ${className}`}
  >
    {content || children}
  </div>
);

export default Card;
