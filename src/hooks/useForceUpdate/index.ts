import { useState } from "react";

function useForceUpdate(): () => void {
  const [, setState] = useState<number>(0);

  function forceUpdate(): void {
    setState((prevState) => prevState + 1);
  }

  return forceUpdate;
}

export default useForceUpdate;
