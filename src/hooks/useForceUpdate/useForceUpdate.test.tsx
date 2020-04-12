import { act, renderHook } from "@testing-library/react-hooks";

import useForceUpdate from "./useForceUpdate";

describe("useForceUpdate", () => {
  it("should be defined", () => {
    expect(useForceUpdate).toBeDefined();
  });

  it("should return function", () => {
    const hook = renderHook(() => useForceUpdate());
    expect(hook.result.current).toBeInstanceOf(Function);
  });

  it("should forces a re-render every function call", () => {
    let renderCount = 0;
    const hook = renderHook(() => {
      renderCount += 1;
      return useForceUpdate();
    });
    const forceUpdate = hook.result.current;

    expect(renderCount).toBe(1);

    act(() => {
      forceUpdate();
    });
    expect(renderCount).toBe(2);

    act(() => forceUpdate());
    expect(renderCount).toBe(3);
  });
});
