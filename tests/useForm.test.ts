import { act, renderHook } from "@testing-library/react-hooks";

import { OnBlurEvent, OnChangeEvent, OnSubmitEvent } from "../src/types";
import { useForm, UseFormErrors } from "../src/useForm";

const initialState = {
  some: "value",
  test: "value",
};

const validate = (values: typeof initialState) => {
  const errors: UseFormErrors<typeof initialState> = {};

  if (values.some === "value") errors.some = "error";

  if (!values.test) errors.test = "empty";

  return errors;
};

const handleSubmit = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 2000));

describe("useForm", () => {
  test("should be defined", () => {
    expect(useForm).toBeDefined();
  });

  test("should set initial state", () => {
    const { result } = renderHook(() => useForm(initialState, handleSubmit));

    expect(result.current.values.some).toBe("value");
  });

  test("setValues must change values", () => {
    const { result } = renderHook(() => useForm(initialState, handleSubmit));

    expect(result.current.values.some).toBe("value");

    void act(() => result.current.setValues({ some: "new value" }));
    expect(result.current.values.some).toBe("new value");
  });

  test("synthetic onChange must change values", () => {
    const mockEvent = {
      target: { name: "some", value: "new value" },
    } as OnChangeEvent;

    const { result } = renderHook(() => useForm(initialState, handleSubmit));

    expect(result.current.values.some).toBe("value");

    void act(() => result.current.onChange(mockEvent));
    expect(result.current.values.some).toBe("new value");
  });

  test("should return isSubmitting and update it then calling handleSubmit", async () => {
    const mockEvent = ({
      preventDefault: jest.fn(),
    } as unknown) as OnSubmitEvent;

    const { result, waitForNextUpdate } = renderHook(() =>
      useForm(initialState, handleSubmit)
    );

    expect(result.current.isSubmitting).toBeFalsy();

    void act(() => {
      result.current.onSubmit(mockEvent);
    });
    expect(result.current.isSubmitting).toBeTruthy();

    await waitForNextUpdate();
    expect(result.current.isSubmitting).toBeFalsy();
  });

  test("must validate after mounting component if flag validateOnMount is true", () => {
    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, { validateOnMount: true })
    );

    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();
  });

  test("dont must validate after mounting component if flag validateOnMount is false", () => {
    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, { validateOnMount: false })
    );

    expect(result.current.errors?.some).toBeUndefined();
    expect(result.current.errors?.test).toBeUndefined();
  });

  test("must validate after onBlur event if flag validateOnBlur is true", () => {
    const mockEvent = {
      target: { name: "some" },
    } as OnBlurEvent;

    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, { validateOnBlur: true })
    );

    expect(result.current.errors?.some).toBeUndefined();
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => result.current.onBlur(mockEvent));

    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();
  });

  test("dont must validate after onBlur event if flag validateOnBlur is false", () => {
    const mockEvent = {
      target: { name: "some" },
    } as OnBlurEvent;

    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, { validateOnBlur: false })
    );

    expect(result.current.errors?.some).toBeUndefined();
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => result.current.onBlur(mockEvent));

    expect(result.current.errors?.some).toBeUndefined();
    expect(result.current.errors?.test).toBeUndefined();
  });

  test("must validate after submitting if flag validateOnSubmit is true", () => {
    const mockEvent = ({
      preventDefault: jest.fn(),
    } as unknown) as OnSubmitEvent;

    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, { validateOnSubmit: true })
    );

    expect(result.current.errors?.some).toBeUndefined();
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => {
      result.current.onSubmit(mockEvent);
    });

    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();
  });

  test("dont must validate after submitting if flag validateOnSubmit is false", () => {
    const mockEvent = ({
      preventDefault: jest.fn(),
    } as unknown) as OnSubmitEvent;

    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, { validateOnSubmit: false })
    );

    expect(result.current.errors?.some).toBeUndefined();
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => {
      result.current.onSubmit(mockEvent);
    });

    expect(result.current.errors?.some).toBeUndefined();
    expect(result.current.errors?.test).toBeUndefined();
  });

  test("should return null if errors object is empty", () => {
    const mockEvent = {
      target: { name: "some" },
    } as OnBlurEvent;

    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, {
        clearOnChange: false,
        validateOnMount: true,
      })
    );

    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => result.current.setValues({ some: "new value" }));
    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => result.current.onBlur(mockEvent));
    expect(result.current.errors).toBeNull();
  });

  test("must delete error after onChange event if flag clearOnChange is true", () => {
    const mockEvent = {
      target: { name: "some", value: "new value" },
    } as OnChangeEvent;

    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, {
        clearOnChange: true,
        validateOnMount: true,
      })
    );

    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => result.current.onChange(mockEvent));
    expect(result.current.errors).toBeNull();
  });

  test("dont must delete error after onChange event if flag clearOnChange is false", () => {
    const mockEvent = {
      target: { name: "some", value: "new value" },
    } as OnChangeEvent;

    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, {
        clearOnChange: false,
        validateOnMount: true,
      })
    );

    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => result.current.onChange(mockEvent));
    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();
  });

  test("should rewrite errors if flag rewrite is true", () => {
    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, {
        validateOnMount: true,
      })
    );

    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => result.current.setErrors({ test: "second" }, true));
    expect(result.current.errors?.some).toBeUndefined();
    expect(result.current.errors?.test).toBe("second");
  });

  test("should update errors if flag rewrite is false", () => {
    const { result } = renderHook(() =>
      useForm(initialState, handleSubmit, validate, {
        validateOnMount: true,
      })
    );

    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBeUndefined();

    void act(() => result.current.setErrors({ test: "second" }, false));
    expect(result.current.errors?.some).toBe("error");
    expect(result.current.errors?.test).toBe("second");
  });

  test("should set null to errors if errors and new errors is empty", () => {
    const { result } = renderHook(() => useForm(initialState, handleSubmit));

    expect(result.current.errors).toBeNull();

    void act(() => result.current.setErrors({}));
    expect(result.current.errors).toBeNull();
  });
});
