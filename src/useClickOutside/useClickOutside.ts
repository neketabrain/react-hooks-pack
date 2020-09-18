import { useCallback, useEffect, useRef, RefObject } from "react";

const useClickOutside = <T extends HTMLElement>(
  callback: VoidFunction
): RefObject<T> => {
  const ref = useRef<T>(null);

  const keyboardListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    },
    [callback]
  );

  const mouseListener = useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyboardListener);
    document.addEventListener("click", mouseListener);

    return (): void => {
      document.removeEventListener("keyup", keyboardListener);
      document.removeEventListener("click", mouseListener);
    };
  }, [keyboardListener, mouseListener]);

  return ref;
};

export default useClickOutside;
