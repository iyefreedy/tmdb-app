import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler;
}

const Badge: React.FC<Props> = ({ children, className, onClick }) => {
  const defaultClassName = twMerge(
    "rounded-full bg-gray-400 px-5 py-1 text-xs font-medium text-white",
    className,
  );
  return (
    <span className={defaultClassName} onClick={onClick}>
      {children}
    </span>
  );
};

export default Badge;
