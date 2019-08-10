/* eslint-disable no-console */
import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const parseJsonItem = item => {
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  };

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) return parseJsonItem(item);

      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(
        key,
        typeof valueToStore === 'string'
          ? valueToStore
          : JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
