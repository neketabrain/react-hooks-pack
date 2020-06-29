import { andThen, compose, propOr } from "ramda";
import { useCallback, useEffect, useState } from "react";

import { OnChangeEvent, onBlurEvent, OnSubmitEvent } from "../types";

import {
  ManualChangeEvent,
  UseForm,
  UseFormErrors,
  UseFormOptions,
  UseFormSubmit,
  UseFormValidate,
} from "./useForm.types";
import {
  checkValidatedValue,
  isSyntheticEvent,
  updateValues,
  validateValues,
} from "./useForm.utils";

const useForm = <T extends Object>(
  initialState: T,
  handleSubmit: UseFormSubmit<T>,
  onValidate?: UseFormValidate<T>,
  options?: UseFormOptions
): UseForm<T> => {
  const clearOnChange: boolean = propOr(true, "clearOnChange", options);
  const validateOnBlur: boolean = propOr(true, "validateOnBlur", options);
  const validateOnMount: boolean = propOr(false, "validateOnMount", options);
  const validateOnSubmit: boolean = propOr(true, "validateOnSubmit", options);

  const [errors, setErrors] = useState<UseFormErrors<T>>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<T>(initialState);

  useEffect(() => {
    if (validateOnMount) {
      compose(
        setErrors,
        validateValues(errors, validateOnMount, onValidate)
      )(values);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onBlur = useCallback(
    (event: onBlurEvent) => {
      if (validateOnBlur) {
        compose(
          setErrors,
          checkValidatedValue(errors, event.target.name),
          validateValues(errors, validateOnBlur, onValidate)
        )(values);
      }
    },
    [errors, onValidate, validateOnBlur, values]
  );

  const onChange = useCallback(
    (event: OnChangeEvent | ManualChangeEvent<T>) => {
      compose(setValues, updateValues(values))(event);

      if (clearOnChange && isSyntheticEvent(event)) {
        compose(setErrors, () =>
          checkValidatedValue(errors, event.target.name)(null)
        )();
      }
    },
    [clearOnChange, errors, values]
  );

  const onSubmit = useCallback(
    async (event: OnSubmitEvent) => {
      event.preventDefault();

      setSubmitting(true);

      await compose(
        andThen(() => setSubmitting(false)),
        (errs: UseFormErrors<T>) => {
          setErrors(errs);
          return handleSubmit(values, errs);
        },
        validateValues(errors, validateOnSubmit, onValidate)
      )(values);
    },
    [errors, handleSubmit, onValidate, validateOnSubmit, values]
  );

  return { errors, isSubmitting, onBlur, onChange, onSubmit, values };
};

export default useForm;
