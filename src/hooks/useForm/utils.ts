import { OnChangeEvent, CustomOnChangeEvent } from "./types";

export function isSyntheticEvent<T>(
  event: OnChangeEvent | CustomOnChangeEvent<T>
): event is OnChangeEvent {
  return (event as OnChangeEvent)?.target !== undefined;
}

export function reduceByType(event: OnChangeEvent) {
  const { type, name, value, checked, files } = event.target;

  switch (type) {
    case "file": {
      return { [name]: files };
    }

    case "checkbox": {
      return { [name]: checked };
    }

    default: {
      return { [name]: value };
    }
  }
}
