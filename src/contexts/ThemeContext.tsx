import React, { createContext, useEffect, useState } from "react";
type ThemeMode = "dark" | "light" | null;

type Theme = {
  mode: ThemeMode;
  toggleTheme: () => void;
};

interface Props {
  children: React.ReactNode;
}

export const ThemeContext = createContext<Theme>({
  mode: null,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    setMode(localTheme as ThemeMode);
  }, []);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const toggleTheme = () => {
    const newTheme = mode === "light" ? "dark" : "light";
    setMode(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
