# `useWindowSize`

Return width and height of window. Values will update after every window resize event.

## Usage

```tsx
import React from "react";
import { useWindowSize } from "react-hooks-pack";
import { useWindowSize } from "react-hooks-pack/esm"; //ES6 modules

function Example() {
  const { innerWidth, innerHeight } = useWindowSize();

  return (
    <div>
      <p>Width: {innerWidth}</p>
      <p>Height: {innerHeight}</p>
    </div>
  );
}
```

## Reference

```ts
import { useWindowSize } from "react-hooks-pack";
import { useWindowSize } from "react-hooks-pack/esm"; //ES6 modules

const { innerWidth, innerHeight } = useWindowSize();
```

- **`innerWidth`**_`: number`_ &mdash; Width of windows;
- **`innerHeight`**_`: number`_ &mdash; Height of window;
