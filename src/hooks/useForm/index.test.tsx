import React from "react";
import { shallow } from "enzyme";

import useForm from "./index";

describe("Testing useForm hook", () => {
  it("With undefined initial value is working", () => {
    const initialState = [
      {
        name: "text",
      },
    ];
    const Component = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [form, onChange] = useForm(initialState as any);
      return (
        <input type="text" name="text" value={form.text} onChange={onChange} />
      );
    };

    const component = shallow(<Component />);
    expect(component.find("input").prop("value")).toBe("");
  });

  it("Error should be thrown if initial state is undefined", () => {
    const initialState = undefined;
    const Component = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [form, onChange] = useForm(initialState as any);
      return (
        <input type="text" name="text" value={form.text} onChange={onChange} />
      );
    };

    expect(() => shallow(<Component />)).toThrowError();
  });

  it("Error should be thrown if initial state is not array", () => {
    const initialState = {
      name: "text",
      value: "",
    };
    const Component = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [form, onChange] = useForm(initialState as any);
      return (
        <input type="text" name="text" value={form.text} onChange={onChange} />
      );
    };

    expect(() => shallow(<Component />)).toThrowError();
  });
});

describe("Testing text input", () => {
  it("Initial value is working", () => {
    const initialState = [
      {
        name: "text",
        value: "Hello world!",
      },
    ];
    const Component = () => {
      const [form, onChange] = useForm(initialState);
      return (
        <input type="text" name="text" value={form.text} onChange={onChange} />
      );
    };

    const component = shallow(<Component />);
    expect(component.find("input").prop("value")).toBe("Hello world!");
  });

  it("onChange function is working", () => {
    const initialState = [
      {
        name: "text",
        value: "",
      },
    ];
    const Component = () => {
      const [form, onChange] = useForm(initialState);
      return (
        <input type="text" name="text" value={form.text} onChange={onChange} />
      );
    };

    const component = shallow(<Component />);
    expect(component.find("input").prop("value")).toBe("");

    component.find("input").simulate("change", {
      currentTarget: { name: "text", value: "Hello world!" },
    });
    expect(component.find("input").prop("value")).toBe("Hello world!");
  });

  it("validate function is working", () => {
    const initialState = [
      {
        name: "text",
        value: "",
        validate: (val: string) => val.replace(/\D/gim, ""),
      },
    ];
    const Component = () => {
      const [form, onChange] = useForm(initialState);
      return (
        <input type="text" name="text" value={form.text} onChange={onChange} />
      );
    };

    const component = shallow(<Component />);
    expect(component.find("input").prop("value")).toBe("");

    component.find("input").simulate("change", {
      currentTarget: { name: "text", value: "Hello123" },
    });
    expect(component.find("input").prop("value")).toBe("123");
  });
});

describe("Testing checkbox input", () => {
  it("Initial value is working", () => {
    const initialState = [
      {
        name: "checkbox",
        value: true,
      },
    ];
    const Component = () => {
      const [form, onChange] = useForm(initialState);
      return (
        <input
          type="checkbox"
          name="checkbox"
          checked={form.checkbox}
          onChange={onChange}
        />
      );
    };

    const component = shallow(<Component />);
    expect(component.find("input").prop("checked")).toBe(true);
  });

  it("onChange function is working", () => {
    const initialState = [
      {
        name: "checkbox",
        value: true,
      },
    ];
    const Component = () => {
      const [form, onChange] = useForm(initialState);
      return (
        <input
          type="checkbox"
          name="checkbox"
          checked={form.checkbox}
          onChange={onChange}
        />
      );
    };

    const component = shallow(<Component />);
    expect(component.find("input").prop("checked")).toBe(true);

    component.find("input").simulate("change", {
      currentTarget: { type: "checkbox", name: "checkbox", checked: false },
    });
    expect(component.find("input").prop("checked")).toBe(false);
  });
});

describe("Testing multiple inputs", () => {
  it("Initial value is working", () => {
    const initialState = [
      {
        name: "text",
        value: "Hello world!",
      },
      {
        name: "checkbox",
        value: true,
      },
    ];
    const Component = () => {
      const [form, onChange] = useForm(initialState);
      return (
        <form>
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={onChange}
          />
          <input
            type="checkbox"
            name="checkbox"
            checked={form.checkbox}
            onChange={onChange}
          />
        </form>
      );
    };

    const component = shallow(<Component />);
    expect(component.find("input").at(0).prop("value")).toBe("Hello world!");
    expect(component.find("input").at(1).prop("checked")).toBe(true);
  });

  it("onChange function is working", () => {
    const initialState = [
      {
        name: "text",
        value: "",
      },
      {
        name: "checkbox",
        value: true,
      },
    ];
    const Component = () => {
      const [form, onChange] = useForm(initialState);
      return (
        <form>
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={onChange}
          />
          <input
            type="checkbox"
            name="checkbox"
            checked={form.checkbox}
            onChange={onChange}
          />
        </form>
      );
    };

    const component = shallow(<Component />);
    expect(component.find("input").at(0).prop("value")).toBe("");
    expect(component.find("input").at(1).prop("checked")).toBe(true);

    component
      .find("input")
      .at(0)
      .simulate("change", {
        currentTarget: { name: "text", value: "Hello world!" },
      });
    component
      .find("input")
      .at(1)
      .simulate("change", {
        currentTarget: { type: "checkbox", name: "checkbox", checked: false },
      });
    expect(component.find("input").at(0).prop("value")).toBe("Hello world!");
    expect(component.find("input").at(1).prop("checked")).toBe(false);
  });

  it("validate function is working", () => {
    const initialState = [
      {
        name: "text",
        value: "",
        validate: (val: string) => val.replace(/\D/gim, ""),
      },
      {
        name: "checkbox",
        value: true,
      },
    ];
    const Component = () => {
      const [form, onChange] = useForm(initialState);
      return (
        <form>
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={onChange}
          />
          <input
            type="checkbox"
            name="checkbox"
            checked={form.checkbox}
            onChange={onChange}
          />
        </form>
      );
    };

    const component = shallow(<Component />);
    expect(component.find("input").at(0).prop("value")).toBe("");
    expect(component.find("input").at(1).prop("checked")).toBe(true);

    component
      .find("input")
      .at(0)
      .simulate("change", {
        currentTarget: { name: "text", value: "Hello123!" },
      });
    component
      .find("input")
      .at(1)
      .simulate("change", {
        currentTarget: { type: "checkbox", name: "checkbox", checked: false },
      });
    expect(component.find("input").at(0).prop("value")).toBe("123");
    expect(component.find("input").at(1).prop("checked")).toBe(false);
  });
});
