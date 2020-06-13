/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook, act } from "@testing-library/react-hooks";

import { useWindowSize } from "../src/useWindowSize";

const resizeWindow = (x: number, y: number) => {
  (window as any).innerWidth = x;
  (window as any).innerHeight = y;
  (window as any).dispatchEvent(new Event("resize"));
};

describe("useWindowSize", () => {
  test("should be defined", () => {
    expect(useWindowSize).toBeDefined();
  });

  test("should return current window dimensions", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(typeof result.current).toBe("object");
    expect(typeof result.current.innerWidth).toBe("number");
    expect(typeof result.current.innerHeight).toBe("number");
  });

  test("should re-render after resize window", () => {
    const { result } = renderHook(() => useWindowSize());

    void act(() => resizeWindow(500, 500));
    expect(result.current.innerWidth).toBe(500);
    expect(result.current.innerHeight).toBe(500);

    void act(() => resizeWindow(1920, 1080));
    expect(result.current.innerWidth).toBe(1920);
    expect(result.current.innerHeight).toBe(1080);
  });
});
