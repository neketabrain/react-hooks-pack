import { ChangeEvent, FocusEvent, FormEvent } from "react";

export type InputOnChangeEvent = ChangeEvent<HTMLInputElement>;

export type InputValue = string | boolean | FileList | null;

export type OnBlurEvent =
  | FocusEvent<HTMLInputElement>
  | FocusEvent<HTMLTextAreaElement>;

export type OnSubmitEvent = FormEvent<HTMLFormElement>;

export type TextAreaOnChangeEvent = ChangeEvent<HTMLTextAreaElement>;

export type Timer = number | undefined;

export type OnChangeEvent = InputOnChangeEvent | TextAreaOnChangeEvent;
