import { useReducer, Reducer, ChangeEvent } from "react";

type Event = ChangeEvent<HTMLInputElement>;
type Value = string | string[] | number | boolean | undefined;

export interface Input {
  name: string;
  value?: Value;
  formatter?(value: Value): Value;
}

interface State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Action {
  name: string;
  value: Value;
}

function formatState(state: Input[]): State {
  return state.reduce((acc: State, input: Input) => {
    const { name, value } = input;
    acc[name] = value === undefined ? "" : value;

    return acc;
  }, {});
}

function reducer(state: State, action: Action): State {
  const { name, value } = action;

  return {
    ...state,
    [name]: value,
  };
}

function useForm(initialState: Input[]): [State, (event: Event) => void] {
  if (!initialState) {
    throw new Error(
      "Initial state is required. See: https://github.com/neketabrain/react-hooks-pack#useforminitialstate"
    );
  }

  if (!Array.isArray(initialState)) {
    throw new Error(
      "Initial state must be an array. See: https://github.com/neketabrain/react-hooks-pack#useforminitialstate"
    );
  }

  const formattedState = formatState(initialState);
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    formattedState
  );

  function onChange(event: Event): void {
    const target = event?.target || {};
    const { name, value, type, checked } = target;

    if (!name) return;

    const newValue = type === "checkbox" ? checked : value;
    const formatter = initialState.find(
      ({ name: inputName }) => inputName === name
    )?.formatter;

    if (formatter) {
      const validValue = formatter(newValue);
      dispatch({ name, value: validValue });
    } else {
      dispatch({ name, value: newValue });
    }
  }

  return [state, onChange];
}

export default useForm;
