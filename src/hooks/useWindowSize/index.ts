import { useLayoutEffect, useState } from "react";

interface State {
  width: number;
  height: number;
}

const initialState = {
  width: 0,
  height: 0,
};

function useWindowSize(): State {
  const [size, setSize] = useState<State>(initialState);

  useLayoutEffect(() => {
    function updateSize(): void {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

export default useWindowSize;
