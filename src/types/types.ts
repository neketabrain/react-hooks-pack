import { ChangeEvent, FormEvent } from "react";

export type Timeout = number | undefined;
export type VoidFunction = () => void;

export type OnSubmitEvent = FormEvent<HTMLFormElement>;
export type OnChangeEvent = ChangeEvent<HTMLInputElement>;
export type InputTarget = EventTarget & HTMLInputElement;
export type InputValue = string | boolean | FileList | null;
