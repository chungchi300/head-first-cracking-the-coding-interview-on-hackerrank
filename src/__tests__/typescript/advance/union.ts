describe("basic", () => {
  it("basic union", () => {
    let name = "hello world";
    function hello(name: string | number) {
      if (typeof name == "string") {
        return name.replace("world", "start");
      } else {
        return `numeric id ${name}`;
      }
    }
    expect(hello(name)).toBe("hello start");
    expect(hello(1)).toBe("numeric id 1");
  });
  it("type guard in union", () => {
    function add(arg1: string | number, arg2: string | number) {
      if (typeof arg1 === "string") {
        //because add operation cannot occur between Union types string | number
        return arg1 + arg2;
      }
      if (typeof arg1 === "number" && typeof arg2 === "number") {
        //because add operation cannot occur between Union types string | number
        return arg1 + arg2;
      }
    }

    expect(add(1, 2)).toBe(3);
    expect(add("1", "2")).toBe("12");
  });
});
