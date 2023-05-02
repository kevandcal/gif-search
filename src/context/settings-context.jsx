import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [isLowResolution, setIsLowResolution] = useLocalStorage('lowResolution', false);
  const [playOnlyOnHover, setPlayOnlyOnHover] = useLocalStorage('playOnlyOnHover', false);
  const [lazyLoadingIsOn, setLazyLoadingIsOn] = useLocalStorage('lazyLoading', true);
  const [darkModeIsActive, setDarkModeIsActive] = useLocalStorage('darkMode', false);

  const values = {
    isLowResolution,
    setIsLowResolution,
    playOnlyOnHover,
    setPlayOnlyOnHover,
    lazyLoadingIsOn,
    setLazyLoadingIsOn,
    darkModeIsActive,
    setDarkModeIsActive
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContext, SettingsProvider }