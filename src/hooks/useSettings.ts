import { useContext } from 'react';
import { SettingsContext } from '../context/settings-context';

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a CountProvider');
  }
  return context;
}