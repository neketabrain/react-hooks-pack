import { useState, useRef, useEffect } from "react";

function useDeferredValue<T>(value: T, delay: number) {
  const [deferredValue, setDeferredValue] = useState(value);
  const timer = useRef<number | undefined>();

  useEffect(() => {
    timer.current = window.setTimeout(() => setDeferredValue(value), delay);

    return () => window.clearTimeout(timer.current);
  }, [value, delay]);

  return deferredValue;
}

export default useDeferredValue;
