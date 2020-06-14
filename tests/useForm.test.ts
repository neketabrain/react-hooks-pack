import { act, renderHook } from "@testing-library/react-hooks";

import { OnChangeEvent, OnSubmitEvent } from "../src/types";
import { useForm } from "../src/useForm";

const initialState = {
  some: "value",
};

const handleSubmit = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 2000));

describe("useForm", () => {
  test("should be defined", () => {
    expect(useForm).toBeDefined();
  });

  test("should set initial state", () => {
    const { result } = renderHook(() =>
      useForm({ initialState, handleSubmit })
    );

    expect(result.current.values.some).toBe("value");
  });

  test("manual onChange must change values", () => {
    const { result } = renderHook(() =>
      useForm({ initialState, handleSubmit })
    );

    expect(result.current.values.some).toBe("value");

    void act(() => result.current.onChange({ some: "new value" }));
    expect(result.current.values.some).toBe("new value");
  });

  test("synthetic onChange must change values", () => {
    const mockEvent = {
      target: { name: "some", value: "new value" },
    } as OnChangeEvent;

    const { result } = renderHook(() =>
      useForm({ initialState, handleSubmit })
    );

    expect(result.current.values.some).toBe("value");

    void act(() => result.current.onChange(mockEvent));
    expect(result.current.values.some).toBe("new value");
  });

  test("values must change if initialState prop was changed", () => {
    const { result, rerender } = renderHook(
      ({ initial }) => useForm({ initialState: initial, handleSubmit }),
      {
        initialProps: {
          initial: initialState,
        },
      }
    );

    expect(result.current.values.some).toBe("value");

    rerender({ initial: { some: "new value" } });
    expect(result.current.values.some).toBe("new value");
  });

  test("should return isSubmitting and update it then calling handleSubmit", async () => {
    const mockEvent = ({
      preventDefault: jest.fn(),
    } as unknown) as OnSubmitEvent;

    const { result, waitForNextUpdate } = renderHook(() =>
      useForm({ initialState, handleSubmit })
    );

    expect(result.current.isSubmitting).toBe(false);

    void act(() => result.current.onSubmit(mockEvent));
    expect(result.current.isSubmitting).toBe(true);

    await waitForNextUpdate();
    expect(result.current.isSubmitting).toBe(false);
  });
});
