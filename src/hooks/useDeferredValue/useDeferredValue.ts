import { useState, useRef, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDeferredValue(value: any, delay: number) {
  const [deferredValue, setDeferredValue] = useState(value);
  const timer = useRef<number | undefined>();

  useEffect(() => {
    timer.current = window.setTimeout(() => setDeferredValue(value), delay);

    return () => window.clearTimeout(timer.current);
  }, [value, delay]);

  return deferredValue;
}

export default useDeferredValue;
