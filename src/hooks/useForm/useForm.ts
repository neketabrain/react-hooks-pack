import { useState, useEffect } from "react";

import {
  UseFormArgs,
  OnChangeEvent,
  CustomOnChangeEvent,
  OnSubmitEvent,
  UseFormErrors,
} from "./types";

import { isSyntheticEvent, reduceByType } from "./utils";

function useForm<Values>(args: UseFormArgs<Values>) {
  const { initialValues, handleSubmit, validate, options = {} } = args;
  const { validateOnBlur = true, validateOnSubmit = true } = options;

  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<UseFormErrors<Values> | object>({});
  const [touched, setTouched] = useState<object>({});

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
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
      const error = Object.entries(validationErrors).find(
        ([key]) => key === name
      );
      const message = error?.[1];
      setErrors({ ...errors, [name]: message });
    }

    setTouched({ ...touched, [name]: true });
  }

  function onSubmit(event: OnSubmitEvent) {
    event.preventDefault();

    if (validate && validateOnSubmit) {
      const validationErrors = validate(values);

      if (validationErrors) {
        setErrors({ ...validationErrors });
        return;
      }
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
