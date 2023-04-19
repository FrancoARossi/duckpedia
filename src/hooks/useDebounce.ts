import { useRef, useEffect } from "react";

// disable eslint because of the any type
/* eslint-disable */
type UseDebounceReturn<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate = false
): UseDebounceReturn<T> => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const debouncedFunc = (...args: Parameters<T>) => {
    clearTimeout(timeoutRef.current);

    if (immediate && !timeoutRef.current) {
      func(...args);
    }

    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunc;
};

export default useDebounce;
