import { OnChangeEvent, CustomOnChangeEvent, UseFormErrors } from "./types";

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

export function errorsIsEmpty<Values>(errors: UseFormErrors<Values>) {
  return (
    Object.keys(errors).length < 1 ||
    Object.values(errors).every((err) => !!err)
  );
}

export function removeNullableErrors<Values>(errors: UseFormErrors<Values>) {
  return Object.entries(errors).reduce((acc, [name, msg]) => {
    if (msg && typeof msg === "string") {
      (acc as { [name: string]: string })[name] = msg;
    }

    return acc;
  }, {} as UseFormErrors<Values>);
}
