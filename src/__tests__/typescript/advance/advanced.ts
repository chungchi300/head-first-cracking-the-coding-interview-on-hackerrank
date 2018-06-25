describe("object spread", () => {
  it("spread and rest", () => {
    //anonymous type id and name
    let firstObj = { id: 1, name: "firstObj" };
    //the Spreading of existing variable will get it's type(an anonymous interface)
    let secondObj = { ...firstObj };
    // secondObj.d = 'd'; is forbidden
    /*
      unless you do
      secondObj = <any>secondObj;
    */
  });
  it("spreading of 2 object", () => {
    let nameObj = { name: "nameObj" };
    let idObj = { id: 2 };
    //create anonymous structural type name & id
    let obj3 = { ...nameObj, ...idObj };
    // obj3.d = 'd'; is forbidden
  });
});
describe("union", () => {
  it("basic anonymous union", () => {
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
  it("named union type", () => {
    let name = "hello world";
    type StringOrNumber = string | number;
    function hello(name: StringOrNumber) {
      if (typeof name == "string") {
        return name.replace("world", "start");
      } else {
        return `numeric id ${name}`;
      }
    }
    expect(hello(name)).toBe("hello start");
    expect(hello(1)).toBe("numeric id 1");
  });
  it("type guard in union type", () => {
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
