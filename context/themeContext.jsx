"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const themes = {
  winter: "winter",
  dracula: "dracula",
};

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || themes.winter;
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (isLoading) {
    return (
      <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
