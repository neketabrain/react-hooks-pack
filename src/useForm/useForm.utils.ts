import {
  call,
  compose,
  has,
  identity,
  ifElse,
  isEmpty,
  mergeRight,
  objOf,
  pathOr,
  propOr,
} from "ramda";

import { InputValue, OnChangeEvent } from "../types";

import {
  ManualChangeEvent,
  UseFormErrors,
  UseFormValidate,
} from "./useForm.types";

// isSyntheticEvent :: OnChangeEvent -> Boolean
export const isSyntheticEvent = has("target");

// base :: OnChangeEvent -> String
const base = pathOr("", ["target", "value"]);

// checkbox :: OnChangeEvent -> Boolean
const checkbox = pathOr(false, ["target", "checked"]);

// file :: OnChangeEvent -> FileList Null
const file = pathOr(null, ["target", "files"]);

// targetType :: OnChangeEvent -> String
const targetType = (event: OnChangeEvent): string =>
  pathOr("text", ["target", "type"], event);

// reduceByType :: OnChangeEvent -> a
export const reduceByType = (
  event: OnChangeEvent
): Record<string, InputValue> =>
  objOf(
    pathOr("", ["target", "name"], event),
    call(propOr(base, targetType(event), { checkbox, file }), event)
  );

// updateValues :: a -> (OnChangeEvent -> a)
export const updateValues = <T extends {}>(
  values: T
): ((event: OnChangeEvent | ManualChangeEvent<T>) => T) =>
  ifElse(
    isSyntheticEvent,
    compose(mergeRight(values), reduceByType),
    mergeRight(values)
  );

// validateValues :: (Boolean, a -> UseFormErrors | Undefined) -> UseFormErrors | Undefined
export const validateValues = <T>(
  hasValidation: boolean,
  onValidate?: UseFormValidate<T>
): ((values: T) => UseFormErrors<T>) =>
  !!onValidate && hasValidation
    ? compose(
        ifElse(isEmpty, () => null, identity),
        onValidate
      )
    : () => null;
