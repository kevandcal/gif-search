// Structured based on https://kentcdodds.com/blog/how-to-use-react-context-effectively:
import React, { createContext, Dispatch, SetStateAction, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type SetFunction = Dispatch<SetStateAction<boolean>>;

interface Values {
  darkModeIsActive: boolean;
  isLowResolution: boolean;
  lazyLoadingIsOn: boolean;
  playOnlyOnHover: boolean;
  setDarkModeIsActive: SetFunction;
  setIsLowResolution: SetFunction;
  setLazyLoadingIsOn: SetFunction;
  setPlayOnlyOnHover: SetFunction;
};

const SettingsContext = createContext<Values | null>(null);

function SettingsProvider({ children }: { children: ReactNode }) {
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