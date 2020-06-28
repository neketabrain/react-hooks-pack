import { onBlurEvent, OnChangeEvent, OnSubmitEvent } from "../types";

export type ManualChangeEvent<T> = Partial<T>;

export type UseFormErrors<T> =
  | {
      [name in keyof Partial<T>]:
        | string
        | string[]
        | number
        | number[]
        | boolean
        | boolean[]
        | Object;
    }
  | null;

export type UseFormSubmit<T> = (
  values: T,
  errors: UseFormErrors<T>
) => Promise<void>;

export type UseFormValidate<T> = (values: T) => UseFormErrors<T>;

export type UseFormOptions = {
  validateOnSubmit?: boolean;
  validateOnBlur?: boolean;
};

export type UseForm<T> = {
  values: T;
  onBlur: (event: onBlurEvent) => void;
  onChange: (event: OnChangeEvent | ManualChangeEvent<T>) => void;
  onSubmit: (event: OnSubmitEvent) => void;
  isSubmitting: boolean;
  errors: UseFormErrors<T>;
};
