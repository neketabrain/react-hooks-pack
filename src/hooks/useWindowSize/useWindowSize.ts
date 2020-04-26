import { useLayoutEffect, useState } from "react";

export interface State {
  width: number;
  height: number;
}

const initialState = {
  width: window?.innerWidth || 0,
  height: window?.innerHeight || 0,
};

function useWindowSize(): State {
  if (!window) {
    throw Error("Window is not defined");
  }

  const [size, setSize] = useState<State>(initialState);

  useLayoutEffect(() => {
    function updateSize(): void {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

export default useWindowSize;
