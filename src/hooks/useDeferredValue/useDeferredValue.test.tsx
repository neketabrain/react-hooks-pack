import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import useDeferredValue from "./useDeferredValue";

describe("useDeferredValue", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should be defined", () => {
    expect(useDeferredValue).toBeDefined();
  });

  it("should return deferred value after delay", () => {
    function Component({ text }: { text: string }) {
      const deferredValue = useDeferredValue(text, 1000);

      return <p>{deferredValue}</p>;
    }

    const component = mount(<Component text="First" />);
    expect(component.text()).toBe("First");

    act(() => {
      component.setProps({ text: "Second" });
    });
    expect(component.text()).toBe("First");

    act(() => {
      jest.runAllTimers();
    });
    expect(component.text()).toBe("Second");
  });
});
