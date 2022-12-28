import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkMode from '../hooks/darkmode';

function DarkMode() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(colorTheme === 'light');

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  return (
    <div className="fixed z-40 transition-all ring-2 ring-offset-2 ring-black ring-offset-white/50 dark:ring-offset-black/50
    dark:ring-white right-8 bottom-8 p-2 bg-white rounded-full dark:bg-black"
    >
      <DarkModeSwitch
        checked={darkMode}
        onChange={toggleDarkMode}
        size={30}
      />
    </div>
  );
}

export default DarkMode;
