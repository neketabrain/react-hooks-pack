import { add } from "ramda";
import { useCallback, useState } from "react";

import { VoidFunction } from "../types";

const useForceUpdate = (): VoidFunction => {
  const [, setState] = useState<number>(0);

  return useCallback(() => setState(add(1)), []);
};

export default useForceUpdate;
