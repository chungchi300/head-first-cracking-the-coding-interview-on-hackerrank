describe("basic", () => {
  it("replace", () => {
    let name = "hello world";
    function hello(name: string) {
      return name.replace("world", "start");
    }
    expect(hello(name)).toBe("hello start");
  });
  it("default", () => {
    function hello(name: string = "jeff"): string {
      return name.replace("jeff", "start");
    }

    expect(hello()).toBe("start");
  });
  it("optional", () => {
    function hello(name?: string): string {
      if (!name) {
        return "default";
      }
      return name.replace("jeff", "start");
    }

    expect(hello()).toBe("default");
  });
  it("function", () => {
    function hello(getName: Function): string {
      return getName();
    }
    function getName() {
      return "jeff chung";
    }
    expect(hello(getName)).toBe("jeff chung");
  });
  it("function with anonymous specific signature", () => {
    function hello(callback: (id: number) => string): string {
      return callback(1);
    }
    function getName(id: number) {
      if (id == 1) {
        return "jeff chung";
      }
      return "other";
    }
    expect(hello(getName)).toBe("jeff chung");
  });
  it("function with anonymous specific signature", () => {
    type idToNameMappingFunction = (id: number) => string;
    function hello(callback): string {
      return callback(1);
    }
    function getName(id: number) {
      if (id == 1) {
        return "jeff chung";
      }
      return "other";
    }
    expect(hello(getName)).toBe("jeff chung");
  });
  it("function overload", () => {
    function add(a: string, b: string): string;
    function add(a: number, b: number): number;
    function add(a: any, b: any): any {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
    expect(add("1", "2")).toBe("12");
  });
});
