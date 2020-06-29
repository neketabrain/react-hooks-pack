import { OnChangeEvent } from "../src/types";
import { UseFormErrors } from "../src/useForm";
import {
  checkObject,
  checkValidatedValue,
  reduceByType,
  updateValues,
  validateValues,
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

    expect(checkValidatedValue(object, "first")(newErrors)).toStrictEqual(
      newErrors
    );
  });

  test("should update error if it not empty", () => {
    const newErrors = { first: "some error", second: "mistake" };

    expect(checkValidatedValue(object, "first")(newErrors)).toStrictEqual(
      newErrors
    );
  });
});

describe("reduceByType", () => {
  test("should return boolean value if type is checkbox", () => {
    const mockEvent = ({
      target: { name: "some", checked: true, type: "checkbox" },
    } as unknown) as OnChangeEvent;

    expect(reduceByType(mockEvent)).toStrictEqual({ some: true });
  });

  test("should return string value if type is text", () => {
    const mockEvent = ({
      target: { name: "some", value: "hello world", type: "text" },
    } as unknown) as OnChangeEvent;

    expect(reduceByType(mockEvent)).toStrictEqual({ some: "hello world" });
  });
});

describe("updateValues", () => {
  test("two objects should be merged", () => {
    expect(updateValues(object)({ second: "hello" })).toStrictEqual({
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

    expect(validateValues({}, true, validate)(object)).toStrictEqual({
      first: "hello",
    });
  });
});
