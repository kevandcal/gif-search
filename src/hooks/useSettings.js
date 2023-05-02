import { useContext } from 'react';
import { SettingsContext } from '../context/settings-context';

export function useSettings() {
  const context = useContext(SettingsContext);
  return context;
}