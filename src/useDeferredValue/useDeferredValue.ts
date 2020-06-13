import { useState, useRef, useEffect } from "react";

import { Timeout } from "../types";

const useDeferredValue = <T>(value: T, delay: number): T => {
  const [deferredValue, setDeferredValue] = useState(value);
  const timer = useRef<Timeout>();

  useEffect(() => {
    timer.current = window.setTimeout(() => setDeferredValue(value), delay);

    return () => window.clearTimeout(timer.current);
  }, [value, delay]);

  return deferredValue;
};

export default useDeferredValue;
