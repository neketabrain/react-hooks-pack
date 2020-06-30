# `useDeferredValue`

Update value after delay.

## Usage

```tsx
import React, { useState } from "react";
import { useDeferredValue } from "react-hooks-pack";
import { useDeferredValue } from "react-hooks-pack/esm"; //ES6 modules

function Example() {
  const [value, setValue] = useState("Initial");
  const deferredValue = useDeferredValue(value, 2000);

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div>
      <input value={value} onChange={handleChange} />
      <p>Deferred value: {deferredValue}</p>
    </div>
  );
}
```

## Reference

```ts
import { useDeferredValue } from "react-hooks-pack";
import { useDeferredValue } from "react-hooks-pack/esm"; //ES6 modules

const deferredValue = useDeferredValue<T>(value: T, delay: number);
```

- **`deferredValue`**_`: T`_ &mdash; Value that was updated after delay;
