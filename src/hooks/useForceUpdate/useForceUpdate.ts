import { useCallback, useState } from "react";

function useForceUpdate(): () => void {
  const [, setState] = useState<number>(0);

  return useCallback(() => setState((prevState) => prevState + 1), []);
}

export default useForceUpdate;
