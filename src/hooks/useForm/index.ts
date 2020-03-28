import { useReducer, Reducer } from "react";

interface IAction {
  name: string;
  value: any;
}

const formReducer: Reducer<any, IAction> = (state, { name, value }) => ({
  ...state,
  [name]: value,
});

const useForm = (initialState: any) => {
  const [state, dispatch] = useReducer<Reducer<any, IAction>>(
    formReducer,
    initialState
  );

  return [state, dispatch];
};

export default useForm;
