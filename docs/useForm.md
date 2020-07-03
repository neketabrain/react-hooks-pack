# `useForm`

The UseForm hook can help when you work with form.

[Demo](https://codesandbox.io/s/useform-demo-yxwys)

## Usage

```tsx
import React from "react";
import { useForm, UseFormErrors } from "react-hooks-pack";
import { useForm, UseFormErrors } from "react-hooks-pack/esm"; // ES6 modules

const initialValues = {
  nickname: "neketabrain",
  email: "",
  check: false,
};

const validate = (values: typeof initialValues) => {
  const errors: UseFormErrors<typeof initialValues> = {};

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.check) {
    errors.check = "Must be checked";
  }

  return errors;
};

const handleSubmit = async (
  values: typeof initialValues,
  errors: UseFormErrors<typeof initialValues>
) => {
  if (errors) {
    console.log("errors: ", errors);
  }

  console.log("values: ", values);
};

const Example: React.FC = () => {
  const { values, errors, onChange, onBlur, onSubmit, isSubmitting } = useForm(
    initialValues,
    handleSubmit,
    validate,
    {
      clearOnChange: false,
      validateOnBlur: false,
      validateOnMount: true,
    }
  );

  return (
    <form onSubmit={onSubmit}>
      <input
        name="nickname"
        onBlur={onBlur}
        value={values.nickname}
        onChange={onChange}
        disabled={isSubmitting}
      />
      <p>{errors?.nickname}</p>

      <input
        name="email"
        type="email"
        onBlur={onBlur}
        value={values.email}
        onChange={onChange}
        disabled={isSubmitting}
      />
      <p>{errors?.email}</p>

      <input
        name="check"
        type="checkbox"
        onBlur={onBlur}
        checked={values.check}
        onChange={onChange}
        disabled={isSubmitting}
      />
      <p>{errors?.check}</p>

      <button type="submit" disabled={isSubmitting}>
        click
      </button>
    </form>
  );
};
```

## Reference

```ts
import { useForm, UseFormErrors } from "react-hooks-pack";
import { useForm, UseFormErrors } from "react-hooks-pack/esm"; // ES6 modules

const { values, errors, touched, onChange, onBlur, onSubmit, setValues, setErrors } = useForm<T>(
  initialValues: T,
  handleSubmit: (values: T, errors: UseFormErrors<T>) => Promise<void>,
  validate?: (values: T) => UseFormErrors<T>,
  {
    clearOnChange?: boolean,
    validateOnBlur?: boolean,
    validateOnMount?: boolean,
  },
);
```

- **`values`**_`: T`_ &mdash; Current values;
- **`errors`**_`: { [name in keyof Partial<T>]: any } | null`_ &mdash; Validation errors. Available if validation method is declared;
- **`isSubmitting`**_`: boolean`_ &mdash; Indicates when onSubmit is running;
- **`onChange`**_`: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void`_ &mdash; Method for changing values;
- **`onSubmit`**_`: (event: React.FormEvent<HTMLFormElement>) => void`_ &mdash; Submit method;
- **`onBlur`**_`: (event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>) => void`_ &mdash; Required for validation after a blur event;
- **`setValues`**_`: (values: Partial<T>) => void`_ &mdash; Manual change values;
- **`setErrors`**_`: (errors: [name in keyof Partial<T>]: any } | null) => void`_ &mdash; Manual change errors;
