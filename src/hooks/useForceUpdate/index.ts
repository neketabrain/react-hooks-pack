import { useState } from "react";

function useForceUpdate(): () => void {
  const [_, setState] = useState(0);

  function forceUpdate() {
    setState((prevState) => prevState + 1);
  }

  return forceUpdate;
}

export default useForceUpdate;
