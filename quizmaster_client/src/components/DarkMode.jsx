import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useDispatch, useSelector } from 'react-redux';
import useDarkMode from '../hooks/darkmode';
import toggleDarkModeAction from '../actions/darkModeActionCreator';

function DarkMode() {
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const darkMode = useSelector((state) => state.darkMode);

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    dispatch(toggleDarkModeAction());
  };

  return (
    <div className="fixed z-40 dark:fill-white transition-all ring-2 ring-offset-2 ring-black ring-offset-white/50 dark:ring-offset-black/50
    dark:ring-white right-8 bottom-8 p-2 bg-white rounded-full dark:bg-black"
    >
      <DarkModeSwitch
        checked={!darkMode}
        onChange={toggleDarkMode}
        size={30}
      />
    </div>
  );
}

export default DarkMode;
