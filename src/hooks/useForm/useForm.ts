import { useState, useEffect } from "react";

import {
  UseFormArgs,
  OnChangeEvent,
  CustomOnChangeEvent,
  OnSubmitEvent,
} from "./types";

import { isSyntheticEvent, reduceByType } from "./utils";

function useForm<Values>(args: UseFormArgs<Values>) {
  const { initialValues, handleSubmit } = args;

  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<object>({});
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
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors });
  }

  function onSubmit(event: OnSubmitEvent) {
    event.preventDefault();

    setErrors({ ...errors });
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
