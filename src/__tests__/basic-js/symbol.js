let _ = require("lodash");
//high function
//global
describe("basic", () => {
  it("typeof ,the seven type,always is unique unless share by for ,a primitive type", () => {
    let s = Symbol();
    //它是一种类似于字符串的数据类型。
    expect(typeof s).toBe("symbol");
    // "symbol"
  });
  it("add description", () => {
    let s1 = Symbol("foo");
    let s2 = Symbol("bar");
    let s3 = Symbol("bar");

    expect(s1.toString()).toBe("Symbol(foo)"); // "Symbol(foo)"
    expect(s2.toString()).toBe("Symbol(bar)");
    expect(s2 != s3).toBe(true);
  });
  it("share by for", () => {
    let s1 = Symbol.for("foo");
    let s2 = Symbol.for("bar");
    let s3 = Symbol.for("bar");

    expect(s1.toString()).toBe("Symbol(foo)"); // "Symbol(foo)"
    expect(s2.toString()).toBe("Symbol(bar)");
    expect(s2 == s3).toBe(true);
  });
  it("the main goal of symbal is create property that have very low accessability unless intent share", () => {
    let firstName = Symbol("first name");
    let person = {};
    //remember javascript object property name don't need to be number
    person[2] = "33";
    person[firstName] = "jeff";
    // expect(person).toEqual({});
    console.log(person);
    expect(person).toEqual({ [firstName]: "jeff", [2]: "33" });
    expect(person[firstName]).toEqual("jeff");
  });

  it("readonly symbol", () => {
    let firstName = Symbol("first name");
    // use a computed object literal property
    let person = {
      [firstName]: "jeff"
    };
    // make the property read only
    Object.defineProperty(person, firstName, { writable: false });
    try {
      person[firstName] = "dd";
      expect(false).toBe(true);
    } catch (err) {
      expect(err instanceof TypeError).toBe(true);
    }

    expect(person[firstName]).toEqual("jeff");
  });
});
