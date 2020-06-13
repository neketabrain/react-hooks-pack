import { useCallback, useRef } from "react";

import { Timeout } from "../types";

import { Debounce } from "./useDebounce.types";

const useDebounce = (): Debounce => {
  const timer = useRef<Timeout>(undefined);

  return useCallback((callback, delay) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(callback, delay);
  }, []);
};

export default useDebounce;
