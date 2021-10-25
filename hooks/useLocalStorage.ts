import { useEffect, useState } from "react";
import * as E from "fp-ts/Either";
import { pipe, flow } from "fp-ts/function";

function getInitialValue<T>(key: string, initialValue: T) {
  return pipe(
    E.tryCatch(
      () => window.localStorage.getItem(key),
      () => new Error("Failed to get localStorage item")
    ),
    E.chain(
      flow(
        E.fromNullable(new Error("Empty localStorage value")),
        E.chain((value) =>
          E.tryCatch(
            () => JSON.parse(value) as unknown as T,
            () => new Error("Failed to parse localStorage item")
          )
        )
      )
    ),
    E.getOrElse(() => initialValue)
  );
}

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // This useEffect is to prevent next.js rehydration error
  // due to client rendering different than the server
  useEffect(() => {
    const value = getInitialValue(key, initialValue);
    setStoredValue(value);
  }, [initialValue, key]);

  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Failed to save items", error);
    }
  };

  return [storedValue, setValue] as const;
}
