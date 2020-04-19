import { useCallback, useRef } from "react";

function useDebounce() {
  const timer = useRef<number | undefined>();

  return useCallback(
    (callback: Function, delay: number) => {
      window.clearTimeout(timer.current);

      timer.current = window.setTimeout(callback, delay);
    },
    [timer]
  );
}

export default useDebounce;
