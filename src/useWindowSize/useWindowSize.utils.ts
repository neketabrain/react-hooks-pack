import { WindowSize } from "./useWindowSize.types";

export const getWindowsSize = (): WindowSize => ({
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
});
