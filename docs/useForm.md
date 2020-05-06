# `useForm`

The UseForm hook can help you when working with form.

## Usage

```tsx
import React from "react";
import { useForm, UseFormErrors } from "react-hooks-pack";

interface Values {
  nickname: string;
  email: string;
  check: boolean;
}

const initialValues: Values = {
  nickname: "neketabrain",
  email: "",
  check: false,
};

function validate(values: Values) {
  const errors: UseFormErrors<Values> = {};

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.check) {
    errors.check = "Must be checked";
  }

  return errors;
}

function handleSubmit(values: Values, errors: UseFormErrors<Values>) {
  if (errors) {
    console.log("errors: ", errors);
  }

  console.log("values: ", values);
}

function Example() {
  const { values, errors, touched, onChange, onBlur, onSubmit } = useForm({
    initialValues,
    handleSubmit,
    validate,
    options: {
      validateOnBlur: false,
      validateOnSubmit: true,
    },
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        name="nickname"
        onBlur={onBlur}
        value={values.nickname}
        onChange={onChange}
      />
      <input
        name="email"
        type="email"
        onBlur={onBlur}
        value={values.email}
        onChange={onChange}
      />
      <input
        name="check"
        type="checkbox"
        onBlur={onBlur}
        checked={values.check}
        onChange={onChange}
      />
      <button type="submit">click</button>
    </form>
  );
}
```

## Reference

```ts
import { useForm, UseFormErrors } from "react-hooks-pack";

const { values, errors, touched, onChange, onBlur, onSubmit } = useForm<T>({
  initialValues: T,
  handleSubmit: (values: T, errors: UseFormErrors<T>) => void,
  validate?: (values: T) => UseFormErrors<T>,
  options?: {
    validateOnBlur?: boolean,
    validateOnSubmit?: boolean,
  },
});
```

- **`values`**_`: T`_ &mdash; Current values;
- **`errors`**_`: { [name in keyof Partial<T>]: string } | null`_ &mdash; Validation errors. Available if validation method is declared;
- **`touched`**_`: { [name in keyof Partial<T>]: boolean }`_ &mdash; Object with the name of inputs that you touched;
- **`onChange`**_`: (event: React.ChangeEvent<HTMLInputElement> | Partial<T>) => void`_ &mdash; Method for changing values;
- **`onSubmit`**_`: (event: React.FormEvent<HTMLFormElement>) => void`_ &mdash; Submit method;
- **`onBlur`**_`: (event: React.ChangeEvent<HTMLInputElement>) => void`_ &mdash; Required for validation after a blur event and for getting the touched object;
