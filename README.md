# react-hooks-pack

[![npm Version](https://img.shields.io/npm/v/react-hooks-pack.svg)](https://www.npmjs.com/package/react-hooks-pack) [![License](https://img.shields.io/npm/l/react-hooks-pack.svg)](https://github.com/neketabrain/react-hooks-pack/blob/master/LICENSE) [![Bundle size](https://badgen.net/bundlephobia/min/react-hooks-pack?label=size)](https://bundlephobia.com/result?p=react-hooks-pack) [![Bundle size](https://badgen.net/bundlephobia/minzip/react-hooks-pack?label=gzip%20size)](https://bundlephobia.com/result?p=react-hooks-pack)

Custom [React hooks](https://reactjs.org/docs/hooks-intro.html) package

## Installation

```
npm install --save react-hooks-pack
```

or

```
yarn add react-hooks-pack
```

<br />

## Hooks

[useForm](#useforminitialstate) - makes it easier to work with form\
[useDeferredValue](#usedeferredvaluevalue-any-delay-number) - delay value change\
[useWindowSize](#usewindowsize) - return window width and height\
[useForceUpdate](#useforceupdate) - call force re-render (not recommended)\
[useTimer](#usetimerconfig) - incremental and decremental timer

<br />

## Usage

### `useForm(initialState)`

```jsx harmony
import React from "react";
import { useForm } from "react-hooks-pack";

const initialState = [
  {
    name: "name",
    value: "initial name",
  },
  {
    name: "phone",
    value: "",
    validate: (val) => val.replace(/\D/gim, ""),
  },
];

function App() {
  const [form, onChange] = useForm(initialState);

  return (
    <form>
      <input name="name" value={form.name} onChange={onChange} />
      <input name="phone" value={form.phone} onChange={onChange} />
    </form>
  );
}
```

##### Configuration

The configuration is required and must be an array

```javascript
const initialState = [
  {
    name: "name", // input name
    value: "", // initial value
    validate: (value) => value, // validation method (optional)
  },
];
```

<br />

### `useDeferredValue(value: any, delay: number)`

```jsx harmony
import React, { useState } from "react";
import { useDeferredValue } from "react-hooks-pack";

function App() {
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

<br />

### `useForceUpdate()`

```jsx harmony
import React from "react";
import { useForceUpdate } from "react-hooks-pack";

function App() {
  const forceUpdate = useForceUpdate();

  return <button onClick={forceUpdate}>Update</button>;
}
```

<br />

### `useWindowSize()`

Values will update after every window resize event

```jsx harmony
import React from "react";
import { useWindowSize } from "react-hooks-pack";

function App() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
    </div>
  );
}
```

<br />

### `useTimer(config?)`

Work in progress

<br />
