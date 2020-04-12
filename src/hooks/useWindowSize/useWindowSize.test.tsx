// @ts-ignore
import { replaceRaf } from "raf-stub";
import { act, renderHook } from "@testing-library/react-hooks";

import useWindowSize from "./useWindowSize";

declare let requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

describe("useWindowSize", () => {
  beforeAll(() => {
    replaceRaf();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it("should be defined", () => {
    expect(useWindowSize).toBeDefined();
  });

  function getHook() {
    return renderHook(() => useWindowSize());
  }

  function triggerResize(newWidth: number, newHeight: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.innerWidth as any) = newWidth;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.innerHeight as any) = newHeight;

    window.dispatchEvent(new Event("resize"));
  }

  it("should return current window dimensions", () => {
    const hook = getHook();

    expect(typeof hook.result.current).toBe("object");
    expect(typeof hook.result.current.height).toBe("number");
    expect(typeof hook.result.current.width).toBe("number");
  });

  it("should re-render after resize window", () => {
    const hook = getHook();

    act(() => {
      triggerResize(128, 128);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.width).toBe(128);
    expect(hook.result.current.height).toBe(128);

    act(() => {
      triggerResize(1920, 1080);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.width).toBe(1920);
    expect(hook.result.current.height).toBe(1080);
  });
});
