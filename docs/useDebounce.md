# `useDebounce`

Call function after delay.

## Usage

```tsx
import React from "react";
import { useDebounce } from "react-hooks-pack";

function Example() {
  const firstDebounce = useDebounce();
  const secondDebounce = useDebounce();

  function firstCallback() {
    console.log(
      `This message will be logged once after 2 seconds if handleChange has not been called for 2 seconds`
    );
  }

  function secondCallback() {
    console.log("Second callback");
  }

  function handleChange() {
    firstDebounce(firstCallback, 2000);
    secondDebounce(secondCallback, 5000);
  }

  return <input onChange={handleChange} />;
}
```

## Reference

```ts
import { useDebounce } from "react-hooks-pack";

const debounce = useDebounce();
```

- **`debounce`**_`: (callback: Function, delay: number) => void`_ &mdash; Method for calling the function after delay;
