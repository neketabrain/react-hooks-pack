import { useCallback, useEffect, useState } from "react";

import { OnChangeEvent, OnBlurEvent, OnSubmitEvent } from "../types";

import {
  UseForm,
  UseFormErrors,
  UseFormOptions,
  UseFormSubmit,
  UseFormValidate,
} from "./useForm.types";
import {
  checkObject,
  checkValidatedValue,
  objectIsEmpty,
  updateValues,
} from "./useForm.utils";

const useForm = <T extends Object>(
  initialState: T,
  handleSubmit: UseFormSubmit<T>,
  onValidate?: UseFormValidate<T>,
  options?: UseFormOptions
): UseForm<T> => {
  const {
    clearOnChange = true,
    validateOnBlur = true,
    validateOnMount = false,
    validateOnSubmit = true,
  } = options || {};

  const [errors, setErrors] = useState<UseFormErrors<T>>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<T>(initialState);

  useEffect(() => {
    if (validateOnMount && onValidate) {
      const newErrors = onValidate(values);
      setErrors(newErrors);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onBlur = useCallback(
    (event: OnBlurEvent) => {
      if (validateOnBlur && onValidate) {
        const updatedErrors = checkValidatedValue(
          onValidate(values),
          errors,
          event.target.name
        );
        setErrors(updatedErrors);
      }
    },
    [errors, onValidate, setErrors, validateOnBlur, values]
  );

  const onChange = useCallback(
    (event: OnChangeEvent) => {
      const updatedValues = updateValues(values, event);
      setValues(updatedValues);

      if (clearOnChange) {
        const updatedErrors = checkValidatedValue(
          null,
          errors,
          event.target.name
        );
        setErrors(updatedErrors);
      }
    },
    [clearOnChange, errors, setErrors, setValues, values]
  );

  const onSubmit = useCallback(
    async (event: OnSubmitEvent) => {
      event.preventDefault();

      setSubmitting(true);

      if (validateOnSubmit && onValidate) {
        const newErrors = checkObject(onValidate(values));
        setErrors(newErrors);

        await handleSubmit(values, newErrors);
      } else {
        await handleSubmit(values, errors);
      }

      setSubmitting(false);
    },
    [
      errors,
      handleSubmit,
      onValidate,
      setErrors,
      setSubmitting,
      validateOnSubmit,
      values,
    ]
  );

  const manualSetErrors = useCallback(
    (newErrors: UseFormErrors<T>, rewrite?: boolean) => {
      if (rewrite) {
        setErrors(objectIsEmpty(newErrors || {}) ? null : newErrors);
      } else {
        const updatedErrors = {
          ...(errors || {}),
          ...(newErrors || {}),
        };

        setErrors(objectIsEmpty(updatedErrors) ? null : updatedErrors);
      }
    },
    [errors, setErrors]
  );

  const manualSetValues = useCallback(
    (newValues: Partial<T>) => {
      const updatedValues = {
        ...values,
        ...newValues,
      };

      setValues(updatedValues);
    },
    [setValues, values]
  );

  return {
    errors,
    isSubmitting,
    onBlur,
    onChange,
    onSubmit,
    setErrors: manualSetErrors,
    setValues: manualSetValues,
    values,
  };
};

export default useForm;
