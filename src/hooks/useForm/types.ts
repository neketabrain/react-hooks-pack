import { ChangeEvent, FormEvent } from "react";

export interface UseFormArgs<Values> {
  initialValues: Values;
  handleSubmit(values: Values, errors: object): void;
  validate?(values: Values): void;
}

export type OnChangeEvent = ChangeEvent<HTMLInputElement>;
export type CustomOnChangeEvent<Values> = Partial<Values>;

export type OnSubmitEvent = FormEvent<HTMLFormElement>;
