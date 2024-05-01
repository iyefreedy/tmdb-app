import React from "react";

interface Props {
  title: string;
  overview: string;
  image: string;
}

const HeroImage: React.FC<Props> = ({ title, overview, image }) => {
  return (
    <header
      className={`relative h-[600px] animate-fade-in bg-gray-900 bg-gradient-to-b from-black from-40% to-[0,0,0,60%] to-100% bg-[length:100%,_cover] bg-center`}
      style={{
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 41%,
          rgba(0, 0, 0, 0.60) 100%
        ), url(${image})`,
      }}
    >
      <div className="mx-auto max-w-7xl p-5">
        <div className="absolute bottom-12 mr-5">
          <h1 className="mb-2 text-lg font-bold text-white shadow-gray-700 text-shadow sm:text-2xl md:text-4xl">
            {title}
          </h1>
          <p className="text-xs text-white shadow-gray-700 text-shadow-sm sm:text-sm md:text-base">
            {overview}
          </p>
        </div>
      </div>
    </header>
  );
};

export default HeroImage;
