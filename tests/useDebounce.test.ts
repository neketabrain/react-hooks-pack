import { renderHook } from "@testing-library/react-hooks";

import { useDebounce } from "../src/useDebounce";

describe("useDebounce", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should be defined", () => {
    expect(useDebounce).toBeDefined();
  });

  test("should return function", () => {
    const { result } = renderHook(() => useDebounce());

    expect(result.current).toBeInstanceOf(Function);
  });

  test("should call passed function after delay once", () => {
    const { result } = renderHook(() => useDebounce());
    const debounce = result.current;
    const callback = jest.fn();

    debounce(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("should reset timeout after calling function again", () => {
    const { result } = renderHook(() => useDebounce());
    const debounce = result.current;
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
  });
});
