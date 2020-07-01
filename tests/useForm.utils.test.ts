import { OnChangeEvent } from "../src/types";
import { UseFormErrors } from "../src/useForm";
import {
  checkObject,
  checkValidatedValue,
  isSyntheticEvent,
  reduceByType,
  updateValues,
} from "../src/useForm/useForm.utils";

const object = {
  first: "error",
  second: "mistake",
};

describe("checkObject", () => {
  test("should return null if object is empty", () => {
    expect(checkObject({})).toBeNull();
  });

  test("should return values if object not empty", () => {
    expect(checkObject({ test: "value" })).toStrictEqual({ test: "value" });
  });
});

describe("checkValidatedValue", () => {
  test("should exclude path if error is empty", () => {
    const newErrors = { second: "mistake" };

    expect(checkValidatedValue(newErrors, object, "first")).toStrictEqual(
      newErrors
    );
  });

  test("should update error if it not empty", () => {
    const newErrors = { first: "some error", second: "mistake" };

    expect(checkValidatedValue(newErrors, object, "first")).toStrictEqual(
      newErrors
    );
  });
});

describe("isSyntheticEvent", () => {
  const mockEvent = ({
    target: { name: "some", checked: false, type: "checkbox" },
  } as unknown) as OnChangeEvent;

  test("should return true if type is ChangeEvent", () => {
    expect(isSyntheticEvent(mockEvent)).toBeTruthy();
  });

  test("should return false if type is ManualChange", () => {
    expect(isSyntheticEvent({ name: "" })).toBeFalsy();
  });
});

describe("reduceByType", () => {
  test("should return boolean if type is checkbox", () => {
    const mockEvent = ({
      target: { name: "some", checked: false, type: "checkbox" },
    } as unknown) as OnChangeEvent;

    expect(reduceByType(mockEvent)).toStrictEqual({ some: false });
  });

  test("should return null if type is file", () => {
    const mockEvent = ({
      target: { checked: false, name: "some", files: null, type: "file" },
    } as unknown) as OnChangeEvent;

    expect(reduceByType(mockEvent)).toStrictEqual({ some: null });
  });

  test("should return string if type is text", () => {
    const mockEvent = ({
      target: { checked: false, name: "some", value: "", type: "text" },
    } as unknown) as OnChangeEvent;

    expect(reduceByType(mockEvent)).toStrictEqual({ some: "" });
  });

  test("should return string if field is textarea", () => {
    const mockEvent = ({
      target: { name: "some", value: "" },
    } as unknown) as OnChangeEvent;

    expect(reduceByType(mockEvent)).toStrictEqual({ some: "" });
  });
});

describe("updateValues", () => {
  test("two objects should be merged", () => {
    expect(updateValues(object, { second: "hello" })).toStrictEqual({
      first: "error",
      second: "hello",
    });
  });
});

describe("validateValues", () => {
  test("must validate and return object of errors", () => {
    const validate = (values: typeof object) => {
      const newErrors: UseFormErrors<typeof object> = {};
      if (values.first === "error") newErrors.first = "hello";
      return newErrors;
    };

    expect(validate(object)).toStrictEqual({
      first: "hello",
    });
  });
});
