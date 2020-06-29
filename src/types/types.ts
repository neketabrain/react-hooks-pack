import { ChangeEvent, FocusEvent, FormEvent } from "react";

export type Timeout = number | undefined;
export type VoidFunction = () => void;

export type InputValue = string | boolean | FileList | null;
export type OnBlurEvent = FocusEvent<HTMLInputElement | HTMLTextAreaElement>;
export type OnChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type OnSubmitEvent = FormEvent<HTMLFormElement>;
