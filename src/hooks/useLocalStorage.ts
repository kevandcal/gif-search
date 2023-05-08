// based on https://usehooks.com/useLocalStorage/:
import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Function with logic to set state initially, only executed once
  const initializeState = () => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(initializeState);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage:
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Room for improvement here in handling the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}