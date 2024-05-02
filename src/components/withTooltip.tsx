import React from "react";

interface TooltipProps {
  message: string;
}

const withTooltip = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: Pick<P, Exclude<keyof P, "message">> & TooltipProps) => {
    const { message, ...restProps } = props;
    return (
      <div className="group relative">
        <Component {...(restProps as P)} />
        <span className="invisible absolute -top-12 inline-block w-24 rounded-lg bg-gray-800 px-2.5 py-0.5 text-center text-xs text-white shadow-lg group-hover:visible">
          {message}
        </span>
      </div>
    );
  };
};
export default withTooltip;
