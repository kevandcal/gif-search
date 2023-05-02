// Structured based on https://kentcdodds.com/blog/how-to-use-react-context-effectively:
import React, { createContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type SetFunction = (value: boolean | Function) => void;

type Values = {
  darkModeIsActive: boolean;
  isLowResolution: boolean;
  lazyLoadingIsOn: boolean;
  playOnlyOnHover: boolean;
  setDarkModeIsActive: SetFunction;
  setIsLowResolution: SetFunction;
  setLazyLoadingIsOn: SetFunction;
  setPlayOnlyOnHover: SetFunction;
};

type SettingsProviderProps = {
  children: ReactNode;
};

const SettingsContext = createContext<Values | undefined>(undefined);

function SettingsProvider({ children }: SettingsProviderProps) {
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