# `useForceUpdate`

Call force re-render.

## Usage

```tsx
import React from "react";
import { useForceUpdate } from "react-hooks-pack";
import { useForceUpdate } from "react-hooks-pack/esm"; //ES6 modules

function Example() {
  const forceUpdate = useForceUpdate();

  return <button onClick={forceUpdate}>Update</button>;
}
```

## Reference

```ts
import { useForceUpdate } from "react-hooks-pack";
import { useForceUpdate } from "react-hooks-pack/esm"; //ES6 modules

const forceUpdate = useDebounce();
```

- **`forceUpdate`**_`: () => void`_ &mdash; Method for calling force re-render;
