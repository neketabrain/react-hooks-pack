import { useEffect, useRef, useState } from "react";

import { Timer } from "../types";

const useDeferredValue = <T>(value: T, delay: number): T => {
  const [deferredValue, setDeferredValue] = useState(value);
  const timer = useRef<Timer>();

  useEffect(() => {
    timer.current = window.setTimeout(() => setDeferredValue(value), delay);

    return () => window.clearTimeout(timer.current);
  }, [delay, setDeferredValue, value]);

  return deferredValue;
};

export default useDeferredValue;
