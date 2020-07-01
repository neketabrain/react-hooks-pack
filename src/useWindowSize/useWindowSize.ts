import { useLayoutEffect, useState } from "react";

import { WindowSize } from "./useWindowSize.types";
import { getWindowsSize } from "./useWindowSize.utils";

const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>(getWindowsSize);

  useLayoutEffect(() => {
    const updateSize = () => setSize(getWindowsSize());
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [setSize]);

  return size;
};

export default useWindowSize;
