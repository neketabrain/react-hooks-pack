import { compose, prop } from "ramda";
import { useCallback, useEffect, useState } from "react";

import { OnChangeEvent, OnSubmitEvent } from "../types";

import { ManualChangeEvent, UseForm, UseFormProps } from "./useForm.types";
import { updateValues } from "./useForm.utils";

const useForm = <T extends Object>(props: UseFormProps<T>): UseForm<T> => {
  const initialState = prop("initialState", props);
  const handleSubmit = prop("handleSubmit", props);

  const [values, setValues] = useState<T>(initialState);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValues(initialState);
  }, [initialState]);

  const onChange = useCallback(
    (event: OnChangeEvent | ManualChangeEvent<T>) =>
      compose(setValues, updateValues(values))(event),
    [values]
  );

  const onSubmit = useCallback(
    async (event: OnSubmitEvent) => {
      event.preventDefault();

      setSubmitting(true);
      await handleSubmit(values);
      setSubmitting(false);
    },
    [handleSubmit, values]
  );

  return { values, onChange, onSubmit, isSubmitting };
};

export default useForm;
