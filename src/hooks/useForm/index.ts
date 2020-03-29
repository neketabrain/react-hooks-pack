import { useReducer, Reducer, ChangeEvent } from "react";

type Event = ChangeEvent<HTMLInputElement>;

interface InputValue {
  value: any;
  validate?(value: any): any;
}

interface InitialState {
  [key: string]: InputValue;
}

interface FormState {
  [key: string]: any;
}

interface FormAction {
  name: string;
  value: any;
  type?: string;
  checked?: boolean;
}

function parseState(state: InitialState): FormState {
  return Object.keys(state).reduce((acc: FormState, key: string) => {
    acc[key] = state[key].value;
    return acc;
  }, {});
}

function reducer(state: FormState, action: FormAction): FormState {
  const { name, value, type, checked } = action;

  if (type === "checkbox") {
    return {
      ...state,
      [name]: checked,
    };
  }

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
    const target = event?.currentTarget || event?.target;
    if (!target?.name) return;

    const validator = initialState?.[target.name]?.validate;
    if (validator) {
      const validValue = validator(target.value);
      dispatch({ ...target, value: validValue });
    } else {
      dispatch(target);
    }
  }

  return [state, onChange];
}

export default useForm;
