import { useLayoutEffect, useState } from "react";

const initialState = {
  width: 0,
  height: 0,
};

function useWindowSize() {
  const [size, setSize] = useState(initialState);

  useLayoutEffect(() => {
    function updateSize() {
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
