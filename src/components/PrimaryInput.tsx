import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  name: string;
  value?: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  step?: string | number;
  style?: React.CSSProperties;
}

type Ref = HTMLInputElement;
const PrimaryInput = forwardRef<Ref, Props>((props, ref) => {
  const { className, type, ...rest } = props;

  const defaultClassName = twMerge(
    "rounded-md border border-slate-400 p-2 transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
    className,
  );

  return (
    <input
      ref={ref}
      type={type ?? "text"}
      className={defaultClassName}
      {...rest}
    />
  );
});

export default PrimaryInput;
