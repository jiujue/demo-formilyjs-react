export const useDebounce = (fn) => {
  let timer = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        fn();
      });
    }
  };
};

export const useThrottle = (fn) => {
  let timer = null;
  return () => {
    if (timer === null) {
      timer = new Date();
      fn();
    } else if (timer + 3000 > timer) {
      timer = null;
      fn();
    }
  };
};
