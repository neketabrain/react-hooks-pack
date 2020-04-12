import { useLayoutEffect, useState } from "react";

interface State {
  width: number;
  height: number;
}

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
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
