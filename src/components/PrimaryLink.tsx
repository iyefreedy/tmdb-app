import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  to: string;
  className?: string;
}

type Ref = HTMLAnchorElement;
const PrimaryLink = forwardRef<Ref, Props>(
  ({ children, to, className }, ref) => {
    const defaultClassname = twMerge(
      "p-2 rounded-md bg-green-600 text-white dark:bg-green-400 dark:text-gray-800",
      className,
    );
    return (
      <Link to={to} ref={ref} className={defaultClassname}>
        {children}
      </Link>
    );
  },
);

export default PrimaryLink;
