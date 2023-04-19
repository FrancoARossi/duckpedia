import { type ReactElement } from "react";

type CardProps = {
  width?: string;
  height?: string;
  content?: ReactElement;
  children?: ReactElement;
};

const Card: React.FC<CardProps> = ({ width, height, content, children }) => (
  <div
    className={`rounded-md bg-slate-50 px-3 py-3 shadow-lg transition-all hover:scale-105 hover:shadow-2xl ${
      width || ""
    } ${height || ""}`}
  >
    {content || children}
  </div>
);

export default Card;
