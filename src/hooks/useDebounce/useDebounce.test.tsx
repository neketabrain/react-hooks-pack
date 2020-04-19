import { act, renderHook } from "@testing-library/react-hooks";

import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should be defined", () => {
    expect(useDebounce).toBeDefined();
  });

  it("should return function", () => {
    const hook = renderHook(() => useDebounce());
    expect(hook.result.current).toBeInstanceOf(Function);
  });

  it("should call passed function after delay once", () => {
    const hook = renderHook(() => useDebounce());
    const debounce = hook.result.current;
    const callback = jest.fn();

    debounce(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(1);

    expect(hook.result.current).toBeInstanceOf(Function);
  });

  it("should reset timeout after calling function again", () => {
    const hook = renderHook(() => useDebounce());
    const debounce = hook.result.current;
    const callback = jest.fn();

    debounce(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    debounce(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    expect(hook.result.current).toBeInstanceOf(Function);
  });
});
