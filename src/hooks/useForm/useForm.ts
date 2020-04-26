import { useReducer, Reducer, ChangeEvent } from "react";

type Event = ChangeEvent<HTMLInputElement>;
type Value = string | string[] | number | boolean | FileList | null | undefined;

export interface Input {
  name: string;
  value?: Value;
  formatter?(value: Value): Value;
}

export type Inputs = Input[];

interface State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Action {
  target: HTMLInputElement;
  formatter?: Function;
}

function formatState(state: Inputs): State {
  return state.reduce((acc: State, input: Input) => {
    const { name, value } = input;
    acc[name] = value === undefined ? "" : value;

    return acc;
  }, {});
}

function mockFormatter(val: Value): Value {
  return val;
}

function reducer(state: State, action: Action): State {
  const { target, formatter = mockFormatter } = action;
  const { type, name, value, checked, files } = target;

  switch (type) {
    case "checkbox": {
      return {
        ...state,
        [name]: formatter(checked),
      };
    }

    case "file": {
      return {
        ...state,
        [name]: formatter(files),
      };
    }

    default: {
      return {
        ...state,
        [name]: formatter(value),
      };
    }
  }
}

function useForm(initialState: Inputs): [State, (event: Event) => void] {
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
    const target = event?.target;

    if (!target || !target.name) return;

    const { formatter } =
      initialState.find((input) => input.name === target.name) || {};

    if (formatter && typeof formatter === "function") {
      dispatch({ target, formatter });
    } else {
      dispatch({ target });
    }
  }

  return [state, onChange];
}

export default useForm;
