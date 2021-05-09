import { useState, useEffect } from "react";

function useDebounce(value: string, delay = 1000) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debounced;
}

export default useDebounce;
