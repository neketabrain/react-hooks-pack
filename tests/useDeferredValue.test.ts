import { renderHook } from "@testing-library/react-hooks";

import { useDeferredValue } from "../src/useDeferredValue";

describe("useDeferredValue", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should be defined", () => {
    expect(useDeferredValue).toBeDefined();
  });

  test("should return deferred value after delay", () => {
    const delay = 5000;

    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ value, delay }) => useDeferredValue(value, delay),
      {
        initialProps: { value: "first", delay },
      }
    );

    expect(result.current).toBe("first");

    rerender({ value: "second", delay });
    void waitForNextUpdate();

    expect(result.current).toBe("first");

    jest.advanceTimersByTime(4000);
    expect(result.current).toBe("first");

    jest.advanceTimersByTime(1000);
    expect(result.current).toBe("second");
  });
});
