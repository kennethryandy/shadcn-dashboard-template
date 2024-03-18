import { useState, useEffect, useCallback } from "react";

// ----------------------------------------------------------------------

type TKey = string;

interface IUseLocalStorage<TDefault> {
  state: TDefault;
  update: (name: keyof TDefault, updateValue: any) => void;
  reset: () => void;
}

export function useLocalStorage<TDefault extends Record<string, any>>(
  key: TKey,
  initialState: TDefault
): IUseLocalStorage<TDefault> {
  const [state, setState] = useState<TDefault>(initialState);

  useEffect(() => {
    const restored = getStorage(key);

    if (restored) {
      setState((prevValue) => ({
        ...prevValue,
        ...restored,
      }));
    }
  }, [key]);

  const updateState = useCallback(
    (name: keyof TDefault, updatedValue: any) => {
      setState((prevValue) => {
        const newValue = {
          ...prevValue,
          [name]: updatedValue,
        };
        setStorage(key, newValue);

        return newValue;
      });
    },
    [key]
  );

  const update = useCallback(
    (name: keyof TDefault, updateValue: any) => {
      updateState(name, updateValue);
    },
    [updateState]
  );

  const reset = useCallback(() => {
    removeStorage(key);
    setState(initialState);
  }, [initialState, key]);

  return {
    state,
    update,
    reset,
  };
}

// ----------------------------------------------------------------------

export const getStorage = <TValue extends Record<string, any>>(
  key: TKey
): TValue | null => {
  let value: TValue | null = null;

  try {
    const result = window.localStorage.getItem(key);

    if (result) {
      value = JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }

  return value;
};

export const setStorage = <TValue extends Record<string, any>>(
  key: TKey,
  value: TValue
) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeStorage = (key: TKey) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
