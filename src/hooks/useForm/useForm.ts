import { useState, useEffect } from "react";

import {
  UseFormArgs,
  OnChangeEvent,
  CustomOnChangeEvent,
  OnSubmitEvent,
  UseFormErrors,
  UseFormTouched,
} from "./types";

import {
  isSyntheticEvent,
  reduceByType,
  errorsIsEmpty,
  removeNullableErrors,
} from "./utils";

function useForm<Values>(args: UseFormArgs<Values>) {
  const { initialValues, handleSubmit, validate, options = {} } = args;
  const { validateOnBlur = true, validateOnSubmit = true } = options;

  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<UseFormErrors<Values> | object | null>(
    null
  );
  const [touched, setTouched] = useState<UseFormTouched<Values> | {}>({});

  useEffect(() => {
    setValues(initialValues);
    setErrors(null);
    setTouched({});
  }, [initialValues]);

  function onChange(event: OnChangeEvent | CustomOnChangeEvent<Values>) {
    if (isSyntheticEvent(event)) {
      const changedValue = reduceByType(event);
      setValues({ ...values, ...changedValue });

      return;
    }

    setValues({ ...values, ...event });
  }

  function onBlur(event: OnChangeEvent) {
    const { name } = event.target;

    if (validate && validateOnBlur) {
      const validationErrors = validate(values);
      const error = (validationErrors as { [name: string]: string })[name];
      const parsedErrors = removeNullableErrors({ ...errors, [name]: error });

      if (errorsIsEmpty(parsedErrors)) {
        setErrors(null);
      } else {
        setErrors(parsedErrors);
      }
    }

    setTouched({ ...touched, [name]: true });
  }

  function onSubmit(event: OnSubmitEvent) {
    event.preventDefault();

    if (validate && validateOnSubmit) {
      const validationErrors = validate(values);
      const parsedErrors = removeNullableErrors(validationErrors);

      if (errorsIsEmpty(parsedErrors)) {
        setErrors(null);
        handleSubmit(values, null);
      } else {
        setErrors(parsedErrors);
        handleSubmit(values, parsedErrors);
      }

      return;
    }

    handleSubmit(values, errors);
  }

  return {
    values,
    errors,
    touched,
    onChange,
    onBlur,
    onSubmit,
  };
}

export default useForm;
