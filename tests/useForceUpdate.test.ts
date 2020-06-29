import { act, renderHook } from "@testing-library/react-hooks";

import { useForceUpdate } from "../src/useForceUpdate";

describe("useForceUpdate", () => {
  test("should be defined", () => {
    expect(useForceUpdate).toBeDefined();
  });

  test("should return function", () => {
    const { result } = renderHook(useForceUpdate);

    expect(result.current).toBeInstanceOf(Function);
  });

  test("should forces a re-render every function call", () => {
    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount += 1;
      return useForceUpdate();
    });

    expect(renderCount).toBe(1);

    void act(() => result.current());
    expect(renderCount).toBe(2);

    void act(() => result.current());
    expect(renderCount).toBe(3);
  });
});
