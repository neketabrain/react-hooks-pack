import {
  call,
  compose,
  has,
  ifElse,
  mergeRight,
  objOf,
  pathOr,
  propOr,
} from "ramda";

import { InputValue, OnChangeEvent } from "../types";

import { ManualChangeEvent } from "./useForm.types";

export const isSyntheticEvent = has("target");

const base = pathOr("", ["target", "value"]);
const checkbox = pathOr("", ["target", "checked"]);
const file = pathOr("", ["target", "files"]);

const targetType = (event: OnChangeEvent): string =>
  pathOr("", ["target", "type"], event);

export const reduceByType = (
  event: OnChangeEvent
): Record<string, InputValue> =>
  objOf(
    pathOr("", ["target", "name"], event),
    call(propOr(base, targetType(event), { checkbox, file }), event)
  );

export const updateValues = <T extends {}>(
  values: T
): ((event: OnChangeEvent | ManualChangeEvent<T>) => T) =>
  ifElse(
    isSyntheticEvent,
    compose(mergeRight(values), reduceByType),
    mergeRight(values)
  );
