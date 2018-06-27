namespace FirstNameSpace {
  export class NameSpaceClass {
    name: string;
  }
}

namespace SecondNameSpace {
  export class NameSpaceClass {
    name: string;
  }
}

describe("class", () => {
  it("class basic", () => {
    //es6 with constructor will be called,actually is just function called with constructor pattern & prototype pattern
    class SimpleClass {
      id: number;
      constructor(id) {
        //the instance
        this.id = id;
      }
      print(): string {
        return `SimpleClass.print(${this.id}) called`;
      }
    }
    let mySimpleClass = new SimpleClass(2);
    expect(mySimpleClass.print()).toBe("SimpleClass.print(2) called");
  });
  it("accessibility modifier is just compilation time feature ", () => {
    //es6 with constructor will be called,actually is just function called with constructor pattern & prototype pattern
    class SimpleClass {
      private id: number;
      constructor(id) {
        //the instance
        this.id = id;
      }
      print(): string {
        return `SimpleClass.print(${this.id}) called`;
      }
    }
    let mySimpleClass = new SimpleClass(2);
    // mySimpleClass.id = "3";
    expect(mySimpleClass.print()).toBe("SimpleClass.print(2) called");
  });
  it("readonly means it can only assign once", () => {
    class ClassWithReadOnly {
      readonly name: string;
      age: number = 27;
      private _id: number;
      constructor(_name: string) {
        //only assignable inconstructor
        this.name = _name;
      }
      setReadOnly(_name: string) {
        // generates a compile error
        // this.name = _name;
      }

      get id() {
        console.log(`inside get id()`);
        return this._id;
      }
      set id(value: number) {
        console.log(`inside set id()`);
        this._id = value;
      }
    }

    let simpleClass = new ClassWithReadOnly("jeff");
    simpleClass.id = 1;
    expect(simpleClass).toEqual({ age: 27, _id: 1, name: "jeff" });
  });
  it("static function and property", () => {
    class StaticProperty {
      static count = 0;
      static updateCount() {
        StaticProperty.count++;
      }
    }
    //in fact it just function (reference value with memory point to another thing)
    expect(StaticProperty.count).toBe(0);
    //reference value
    expect(typeof StaticProperty.updateCount).toBe("function");
  });
  it("flexible syntax", () => {
    interface IComplexType {}
    class ComplexType implements IComplexType {
      id: number;
      name: string;
      constructor(idArg: number, nameArg: string);
      constructor(idArg: string, nameArg: string);
      constructor(idArg: any, nameArg: any) {
        this.id = idArg;
        this.name = nameArg;
      }
      print(): string {
        return "id:" + this.id + " name:" + this.name;
      }
      usingTheAnyKeyword(arg1: any): any {
        this.id = arg1;
      }
      usingOptionalParameters(optionalArg1?: number) {
        if (optionalArg1) {
          this.id = optionalArg1;
        }
      }
      usingDefaultParameters(defaultArg1: number = 0) {
        this.id = defaultArg1;
      }
      usingRestSyntax(...argArray: number[]) {
        if (argArray.length > 0) {
          this.id = argArray[0];
        }
      }
      usingFunctionCallbacks(callback: (id: number) => string) {
        callback(this.id);
      }
    }
  });
  it("name space", () => {
    let secondNameSpace = new SecondNameSpace.NameSpaceClass();
    let firstNameSpace = new FirstNameSpace.NameSpaceClass();
  });
});
