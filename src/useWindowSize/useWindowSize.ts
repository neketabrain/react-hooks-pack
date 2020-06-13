import { compose, pick } from "ramda";
import { useLayoutEffect, useState } from "react";

import { WindowSize } from "./useWindowSize.types";

const RESIZE = "resize";

const windowsSize = (): WindowSize =>
  pick(["innerWidth", "innerHeight"], window);

const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>(windowsSize);

  useLayoutEffect(() => {
    const updateSize = compose(setSize, windowsSize);
    window.addEventListener(RESIZE, updateSize);

    return () => window.removeEventListener(RESIZE, updateSize);
  }, []);

  return size;
};

export default useWindowSize;
