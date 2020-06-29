import {
  and,
  assoc,
  call,
  compose,
  dissoc,
  identity,
  ifElse,
  isEmpty,
  isNil,
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

// checkObject :: a -> (a | Null)
const checkObject = <T extends Object>(object: T): T | null =>
  ifElse(
    isEmpty,
    () => null,
    () => object
  )(object);

// isSyntheticEvent :: (ManualChangeEvent | OnChangeEvent) -> Boolean
export const isSyntheticEvent = <T>(
  event: ManualChangeEvent<T> | OnChangeEvent
): event is OnChangeEvent => "target" in event;

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

// validateValues :: (UseFormErrors, Boolean, (a -> UseFormErrors | Undefined)) -> (a -> UseFormErrors | Undefined)
export const validateValues = <T>(
  errors: UseFormErrors<T>,
  shouldValidate: boolean,
  onValidate?: UseFormValidate<T>
): ((values: T) => UseFormErrors<T>) =>
  !!onValidate && shouldValidate
    ? compose(
        ifElse(isEmpty, () => null, identity),
        onValidate
      )
    : () => errors;

// checkValidatedValue :: (UseFormErrors, String) -> (UseFormErrors -> UseFormErrors)
export const checkValidatedValue = <T>(
  prevErrors: UseFormErrors<T>,
  name: string
) => <P>(errors: UseFormErrors<P>): UseFormErrors<P> =>
  compose(
    ifElse(
      (error) => and(!isEmpty(error), !isNil(error)),
      (error) => assoc(name, error, prevErrors),
      () => checkObject(dissoc(name, prevErrors))
    ),
    propOr(null, name)
  )(errors);
