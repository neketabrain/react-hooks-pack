import { ChangeEvent, FormEvent } from "react";

export type OnChangeEvent = ChangeEvent<HTMLInputElement>;
export type CustomOnChangeEvent<Values> = Partial<Values>;

export type OnSubmitEvent = FormEvent<HTMLFormElement>;

export type UseFormErrors<Values> = {
  [name in keyof Partial<Values>]: string | null;
};

interface Options {
  validateOnSubmit?: boolean;
  validateOnBlur?: boolean;
}

export interface UseFormArgs<Values> {
  initialValues: Values;
  handleSubmit(values: Values, errors: object): void;
  validate?(values: Values): UseFormErrors<Values>;
  options?: Options;
}
