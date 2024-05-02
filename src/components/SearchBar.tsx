import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  dispatcher: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({ dispatcher }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      dispatcher(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatcher, state]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setState(event.target.value);
  };

  return (
    <div className={`p-5`}>
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-6 w-6 text-gray-600 dark:text-gray-200" />
        <input
          id="searchMovies"
          type="text"
          className="block w-full rounded-full  bg-white px-5 py-2 pl-12 text-lg text-gray-900 shadow-lg outline-none placeholder:text-gray-400 dark:bg-gray-600 dark:text-gray-200 "
          onChange={handleChange}
          value={state}
          placeholder="Search for movies..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
