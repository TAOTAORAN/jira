import { useState, useEffect } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// null == undefined ==> true
export const isVoid = (value: unknown) => value == null || value === "";

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDebounced = <V>(val: V, delay?: number) => {
  const [debouncedVal, setDebouncedVal] = useState(val);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedVal(val), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [val, delay]);
  return debouncedVal;
};

// const debounce = (func, delay) => {
//   let timer;
//   return () => {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(function () {
//         func();
//     }, delay);
//   }
// }

// const log = debounce(() => console.log('测试'), 5000);
// log();
// log();
// log();

export const useMount = (func: () => void) => {
  useEffect(() => {
    func();
  }, []);
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.slice(index, 1);
      setValue(copy);
    },
  };
};
