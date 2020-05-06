# `useWindowSize`

Return window width and height. Values will update after every window resize event.

## Usage

```tsx
import React from "react";
import { useWindowSize } from "react-hooks-pack";

function Example() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
    </div>
  );
}
```

## Reference

```ts
import { useWindowSize } from "react-hooks-pack";

const { width, height } = useWindowSize();
```

- **`width`**_`: number`_ &mdash; Window width;
- **`height`**_`: number`_ &mdash; Window height;
