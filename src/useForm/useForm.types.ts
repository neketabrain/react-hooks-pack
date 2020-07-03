import { OnBlurEvent, OnChangeEvent, OnSubmitEvent } from "../types";

export type UseFormErrors<T> = { [name in keyof Partial<T>]: any } | null; // eslint-disable-line @typescript-eslint/no-explicit-any

export type UseFormSubmit<T> = (
  values: T,
  errors: UseFormErrors<T>
) => Promise<void>;

export type UseFormValidate<T> = (values: T) => UseFormErrors<T>;

export type UseFormOptions = {
  clearOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
  validateOnSubmit?: boolean;
};

export type UseForm<T> = {
  errors: UseFormErrors<T>;
  isSubmitting: boolean;
  onBlur: (event: OnBlurEvent) => void;
  onChange: (event: OnChangeEvent) => void;
  onSubmit: (event: OnSubmitEvent) => void;
  setErrors: (errors: UseFormErrors<T>, rewrite?: boolean) => void;
  setValues: (values: Partial<T>) => void;
  values: T;
};
