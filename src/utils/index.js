export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDebounced = (val, delay) => {
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

export const useMount = (func) => {
  useEffect(() => {
    func();
  }, []);
};
