import { useCallback, useState } from "react";

const useForceUpdate = (): VoidFunction => {
  const [, setState] = useState<number>(0);

  return useCallback(() => setState((prevState) => prevState + 1), [setState]);
};

export default useForceUpdate;
