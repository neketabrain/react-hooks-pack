# `useForceUpdate`

Call force re-render.

## Usage

```tsx
import React from "react";
import { useForceUpdate } from "react-hooks-pack";

function Example() {
  const forceUpdate = useForceUpdate();

  return <button onClick={forceUpdate}>Update</button>;
}
```

## Reference

```ts
import { useForceUpdate } from "react-hooks-pack";

const forceUpdate = useDebounce();
```

- **`forceUpdate`**_`: () => void`_ &mdash; Method for calling force re-render;
