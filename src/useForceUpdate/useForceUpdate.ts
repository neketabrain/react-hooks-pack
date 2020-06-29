import { inc } from "ramda";
import { useCallback, useState } from "react";

import { VoidFunction } from "../types";

const useForceUpdate = (): VoidFunction => {
  const [, setState] = useState<number>(0);

  return useCallback(() => setState(inc), []);
};

export default useForceUpdate;
