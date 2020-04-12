import { act, renderHook } from "@testing-library/react-hooks";

import { ChangeEvent } from "react";

import useForm, { Input } from "./useForm";

function getHook(state: Input[]) {
  return renderHook(() => useForm(state));
}

describe("useForm", () => {
  it("should be defined", () => {
    expect(useForm).toBeDefined();
  });

  it("should working if initial value is undefined", () => {
    const initialState = [
      {
        name: "text",
      },
    ];

    const hook = getHook(initialState);
    expect(hook.result.current[0].text).toBe("");
  });

  it("should throw error if initial state is undefined", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hook = getHook(undefined as any);
    expect(hook.result.error.message).toBe(
      "Initial state is required. See: https://github.com/neketabrain/react-hooks-pack#useforminitialstate"
    );
  });

  it("should throw error if initial state is not array", () => {
    const initialState = {
      name: "text",
      value: "",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hook = getHook(initialState as any);
    expect(hook.result.error.message).toBe(
      "Initial state must be an array. See: https://github.com/neketabrain/react-hooks-pack#useforminitialstate"
    );
  });

  it("should use initial value", () => {
    const initialState = [
      {
        name: "text",
        value: "Hello world!",
      },
    ];

    const hook = getHook(initialState);
    expect(hook.result.current[0].text).toBe("Hello world!");
  });

  it("should change value after call onChange function", () => {
    const initialState = [
      {
        name: "text",
        value: "",
      },
    ];

    const hook = getHook(initialState);
    const [, onChange] = hook.result.current;
    expect(hook.result.current[0].text).toBe("");

    act(() =>
      onChange({
        currentTarget: { name: "text", value: "Hello world!" },
      } as ChangeEvent<HTMLInputElement>)
    );

    expect(hook.result.current[0].text).toBe("Hello world!");
  });

  it("should use validate function", () => {
    const initialState = [
      {
        name: "text",
        value: "",
        validate: (val: string) => val.replace(/\d/gim, ""),
      },
    ];

    const hook = getHook(initialState);
    const [, onChange] = hook.result.current;

    expect(hook.result.current[0].text).toBe("");

    act(() =>
      onChange({
        currentTarget: { name: "text", value: "Hello" },
      } as ChangeEvent<HTMLInputElement>)
    );

    expect(hook.result.current[0].text).toBe("Hello");
  });
});
