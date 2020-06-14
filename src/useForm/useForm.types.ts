import { OnChangeEvent, OnSubmitEvent } from "../types";

export type ManualChangeEvent<T> = Partial<T>;

type UseFormOptions = {
  validateOnSubmit?: boolean;
  validateOnBlur?: boolean;
};

export type UseFormProps<T> = {
  initialState: T;
  handleSubmit: (values: T) => Promise<void>;
  options?: UseFormOptions;
};

export type UseForm<T> = {
  values: T;
  onChange: (event: OnChangeEvent | ManualChangeEvent<T>) => void;
  onSubmit: (event: OnSubmitEvent) => void;
  isSubmitting: boolean;
};
