import { renderHook } from "@testing-library/react-hooks";

import { useClickOutside } from "../src/useClickOutside";

const mockFunction = () => {};

describe("useClickOutside", () => {
  test("should be defined", () => {
    expect(useClickOutside).toBeDefined();
  });

  test("should return empty ref", () => {
    const { result } = renderHook(() => useClickOutside(mockFunction));

    expect(result.current.current).toBeNull();
  });
});
