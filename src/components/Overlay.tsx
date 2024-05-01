import React from "react";

interface Props {
  children: React.ReactNode;
}

const Overlay: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative inline-block overflow-hidden rounded-lg shadow-lg before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-gradient-to-b before:from-transparent before:from-80% before:to-black before:to-100% before:content-['']">
      {children}
    </div>
  );
};

export default Overlay;
