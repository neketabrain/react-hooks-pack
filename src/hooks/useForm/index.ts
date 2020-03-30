import { useReducer, Reducer, ChangeEvent } from "react";

type Event = ChangeEvent<HTMLInputElement>;
type ValueTypes = string | string[] | number | boolean | undefined;

interface InputValue {
  value: ValueTypes;
  validate?(value: ValueTypes): ValueTypes;
}

interface InitialState {
  [key: string]: InputValue;
}

interface FormState {
  [key: string]: any;
}

interface FormAction {
  name: string;
  value: ValueTypes;
}

function parseState(state: InitialState): FormState {
  return Object.keys(state).reduce((acc: FormState, key: string) => {
    acc[key] = state[key].value;

    return acc;
  }, {});
}

function reducer(state: FormState, action: FormAction): FormState {
  const { name, value } = action;

  return {
    ...state,
    [name]: value,
  };
}

function useForm(
  initialState: InitialState
): [FormState, (event: Event) => void] {
  const parsedState = parseState(initialState);
  const [state, dispatch] = useReducer<Reducer<FormState, FormAction>>(
    reducer,
    parsedState
  );

  function onChange(event: Event): void {
    const target = event?.currentTarget || event?.target || {};
    const { name, value, type, checked } = target;

    if (!name) return;

    const inputValue = type === "checkbox" ? checked : value;
    const validator = initialState[name]?.validate;

    if (validator) {
      const validValue = validator(inputValue);
      dispatch({ name, value: validValue });
    } else {
      dispatch({ name, value: inputValue });
    }
  }

  return [state, onChange];
}

export default useForm;
