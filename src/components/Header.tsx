import { Link } from "react-router-dom";
import reactLogo from "@assets/react.svg";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";
import PrimaryLink from "./PrimaryLink";
import PrimaryButton from "./PrimaryButton";
import Spinner from "./Spinner";

const Header: React.FC = () => {
  const { user, attemptLogout, loading } = useAuth();
  const { mode, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white p-5 shadow-md transition dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <img src={reactLogo} alt="React logo" />
        </Link>

        <div className="flex items-center space-x-6">
          <button
            type="button"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full p-1.5 focus:ring focus:ring-gray-400 dark:focus:ring-gray-600"
          >
            {mode === "dark" ? (
              <SunIcon className="mx-auto h-6 w-6 text-black dark:text-white" />
            ) : (
              <MoonIcon className="mx-auto h-6 w-6 text-black dark:text-white" />
            )}
          </button>

          <div ref={dropdownRef}>
            {user ? (
              <PrimaryButton
                className="relative h-10 w-10 rounded-full"
                onClick={toggleDropdown}
              >
                {loading ? (
                  <Spinner className="my-0 h-5 w-5 p-0" />
                ) : (
                  <span>{user?.username?.at(0)}</span>
                )}
                <div
                  className={`absolute right-0 top-16 w-48 divide-y-2 divide-gray-200 rounded-md bg-white py-2 shadow-md dark:divide-gray-700 dark:bg-gray-900 ${!isOpen && "hidden"}`}
                >
                  <div className="space-y-1.5">
                    <Link
                      to={"/ratings"}
                      className="block  px-4 py-1 text-start text-gray-800 dark:text-slate-200"
                    >
                      Ratings
                    </Link>
                    <Link
                      to={"/watchlist"}
                      className="block  px-4 py-1 text-start text-gray-800 dark:text-slate-200"
                    >
                      Watchlists
                    </Link>
                    <Link
                      to={"/favorites"}
                      className="block  px-4 py-1 text-start text-gray-800 dark:text-slate-200"
                    >
                      Favorites
                    </Link>
                  </div>
                  <Link
                    to={"/"}
                    onClick={attemptLogout}
                    className="block w-full px-4 py-1.5 text-start text-gray-800 dark:text-slate-200"
                  >
                    Logout
                  </Link>
                </div>
              </PrimaryButton>
            ) : (
              <PrimaryLink
                to={"/login"}
                className={`inline-block w-24 rounded-full text-center`}
              >
                {loading ? <Spinner className="my-0 h-5 w-5 p-0" /> : "Login"}
              </PrimaryLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
