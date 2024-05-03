import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  type?: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  tooltip?: string;
}

type Ref = HTMLButtonElement;

const PrimaryButton = forwardRef<Ref, Props>(
  ({ children, type, className, onClick }, ref) => {
    const defaultClassname = twMerge(
      "p-2 rounded-md bg-green-700 text-white dark:bg-green-400 dark:text-gray-800",
      className,
    );

    return (
      <button
        type={type}
        onClick={onClick}
        ref={ref}
        className={defaultClassname}
      >
        {children}
      </button>
    );
  },
);

export default PrimaryButton;
