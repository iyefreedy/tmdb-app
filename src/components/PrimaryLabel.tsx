import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}

type Ref = HTMLLabelElement;

const PrimaryLabel = forwardRef<Ref, Props>(
  ({ children, htmlFor, className }, ref) => {
    const defaultClassName = twMerge(
      "mb-2 font-medium text-gray-800 dark:text-gray-200",
      className,
    );
    return (
      <label ref={ref} htmlFor={htmlFor} className={defaultClassName}>
        {children}
      </label>
    );
  },
);

export default PrimaryLabel;
