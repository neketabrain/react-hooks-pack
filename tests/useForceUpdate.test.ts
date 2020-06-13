import { renderHook, act } from "@testing-library/react-hooks";

import { useForceUpdate } from "../src/useForceUpdate";

describe("useForceUpdate", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("should be defined", () => {
    expect(useForceUpdate).toBeDefined();
  });

  it("should forces a re-render every function call", () => {
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
