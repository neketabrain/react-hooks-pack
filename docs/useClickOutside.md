# `useClickOutside`

Detect clicks outside of a specified element.

## Usage

```tsx
import React from "react";
import { useClickOutside } from "react-hooks-pack";
import { useClickOutside } from "react-hooks-pack/esm"; //ES6 modules

const log = () => console.log("Clicked");

function Example() {
  const ref = useClickOutside<HTMLDivElement>(log);

  return (
    <div>
      <div ref={ref}>Example</div>
    </div>
  );
}
```

## Reference

```ts
import { useClickOutside } from "react-hooks-pack";
import { useClickOutside } from "react-hooks-pack/esm"; //ES6 modules

const ref = useClickOutside(fn);
```

- **`ref`**_`: RefObject<T extends HTMLElement>`_ &mdash; Ref
