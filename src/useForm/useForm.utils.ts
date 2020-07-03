import {
  InputOnChangeEvent,
  InputValue,
  OnChangeEvent,
  TextAreaOnChangeEvent,
} from "../types";

const excludeProp = <T>(object: T, name: string): T => {
  const newObject = { ...object };
  delete newObject[name as keyof T];

  return newObject;
};

export const objectIsEmpty = <T>(object: T | {}): object is {} =>
  Object.keys(object).length === 0;

export const checkObject = <T>(object: T): T | null => {
  if (!object) return null;

  return objectIsEmpty(object) ? null : object;
};

export const checkValidatedValue = <T, P>(
  errors: T,
  prevErrors: P,
  name: string
): P | null => {
  const error = errors?.[name as keyof T];

  if (!error || objectIsEmpty(error)) {
    return prevErrors ? checkObject(excludeProp(prevErrors, name)) : null;
  }

  return { ...prevErrors, [name]: error };
};

const isTextAreaEvent = (
  event: InputOnChangeEvent | TextAreaOnChangeEvent
): event is TextAreaOnChangeEvent =>
  !("checked" in event.target || "files" in event.target);

export const reduceByType = (
  event: OnChangeEvent
): Record<string, InputValue> => {
  const { name, type, value } = event.target;

  if (isTextAreaEvent(event)) {
    return { [name]: value };
  }

  const { checked, files } = event.target;
  switch (type) {
    case "checkbox": {
      return { [name]: checked || false };
    }

    case "file": {
      return { [name]: files || null };
    }

    default: {
      return { [name]: value || "" };
    }
  }
};

export const updateValues = <T extends Object>(
  values: T,
  event: OnChangeEvent
): T => {
  return { ...values, ...reduceByType(event) };
};
