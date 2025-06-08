import React, { useState, useEffect } from 'react';
import { Theme } from '../types';
import { MoonIcon } from '../constants';

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;
    }
    return Theme.Light;
  });

  useEffect(() => {
    if (theme === Theme.Dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === Theme.Light ? Theme.Dark : Theme.Light));
  };

  // Define a distinct sun icon SVG
  const SunIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark hover:bg-themeColors-accentLight/10 dark:hover:bg-themeColors-accentDark/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark focus:ring-offset-2 focus:ring-offset-themeColors-cardBgLight dark:focus:ring-offset-themeColors-cardBgDark"
      aria-label={theme === Theme.Light ? "Passer au thème sombre (vert)" : "Passer au thème clair (vert)"}
    >
      {theme === Theme.Light ? (
        <MoonIcon className="w-5 h-5 text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark" />
      ) : (
        <SunIcon />
      )}
    </button>
  );
};

export default ThemeSwitcher;