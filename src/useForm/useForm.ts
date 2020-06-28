import { andThen, compose, propOr } from "ramda";
import { useCallback, useState } from "react";

import { OnChangeEvent, OnSubmitEvent } from "../types";

import {
  ManualChangeEvent,
  UseForm,
  UseFormErrors,
  UseFormOptions,
  UseFormSubmit,
  UseFormValidate,
} from "./useForm.types";
import { updateValues, validateValues } from "./useForm.utils";

const useForm = <T extends Object>(
  initialState: T,
  handleSubmit: UseFormSubmit<T>,
  onValidate?: UseFormValidate<T>,
  options?: UseFormOptions
): UseForm<T> => {
  const validateOnSubmit: boolean = propOr(true, "validateOnSubmit", options);
  const validateOnBlur: boolean = propOr(true, "validateOnBlur", options);

  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<UseFormErrors<T>>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const onChange = useCallback(
    (event: OnChangeEvent | ManualChangeEvent<T>) =>
      compose(setValues, updateValues(values))(event),
    [values]
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
        validateValues(validateOnSubmit, onValidate)
      )(values);
    },
    [handleSubmit, onValidate, validateOnSubmit, values]
  );

  const onBlur = useCallback(() => {
    compose(setErrors, validateValues(validateOnBlur, onValidate))(values);
  }, [onValidate, validateOnBlur, values]);

  return { values, onBlur, onChange, onSubmit, isSubmitting, errors };
};

export default useForm;
