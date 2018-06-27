describe("interface", () => {
  interface IBase {
    id: number;
  }

  interface IDerivedFromBase extends IBase {
    name: string;
  }

  class InterfaceInheritanceClass implements IDerivedFromBase {
    id: number = 22;
    name: string = "jeff";
  }
  it("interface can be inheritance", () => {
    let aInterfaceInheritanceClassImplementation = new InterfaceInheritanceClass();

    expect(aInterfaceInheritanceClassImplementation).toEqual({
      id: 22,
      name: "jeff"
    });
  });
});
describe("class interface", () => {
  interface IBase {
    id: number;
  }

  interface IDerivedFromBase extends IBase {
    name: string;
  }

  class BaseClass implements IBase {
    id: number = 22;
  }

  class DerivedFromBaseClass extends BaseClass implements IDerivedFromBase {
    name: string = "jeff";
  }
  it("interface can be inheritance,and also class property", () => {
    let aInterfaceInheritanceClassImplementation = new DerivedFromBaseClass();

    expect(aInterfaceInheritanceClassImplementation).toEqual({
      id: 22,
      name: "jeff"
    });
  });

  it("do not support multiple inheritance but multiple interface ", () => {
    interface IFirstInterface {
      id: number;
    }
    interface ISecondInterface {
      name: string;
    }
    class MultipleInterfaces implements IFirstInterface, ISecondInterface {
      id: number = 22;
      name: string = "jeff";
    }
    expect(new MultipleInterfaces()).toEqual({
      id: 22,
      name: "jeff"
    });
  });
  it("super constructor,calling not super component", () => {
    class BaseClassWithConstructor {
      private id: number;
      constructor(_id: number) {
        this.id = _id;
      }
    }

    class DerivedClassWithConstructor extends BaseClassWithConstructor {
      private name: string;
      constructor(_id: number, _name: string) {
        super(_id);
        this.name = _name;
      }
    }
    expect(new DerivedClassWithConstructor(22, "jeff")).toEqual({
      id: 22,
      name: "jeff"
    });
  });
  it("function masking,solved by function overloading", () => {
    class BaseClassWithFunction {
      public id: number = 22;
      getProperties(): string {
        return `id: ${this.id}`;
      }
    }

    class DerivedClassWithFunction extends BaseClassWithFunction {
      public name: string = "jeff";
      getProperties(): string {
        return `${super.getProperties()}` + ` , name: ${this.name}`;
      }
    }
    expect(new DerivedClassWithFunction().getProperties()).toEqual(
      "id: 22 , name: jeff"
    );
  });
  it("protected", () => {
    class ClassUsingProtected {
      protected id: number;
      private name: string = "jeff";
      public getId() {
        return this.id;
      }
    }

    class DerivedFromProtected extends ClassUsingProtected {
      constructor() {
        super();
        this.id = 22;
        // this.name = 'dd'; not working because private
      }
    }
    expect(new DerivedFromProtected().getId()).toEqual(22);
  });
  it("abstract class to increase code reuse before", () => {
    class Employee {
      public id: number;
      public name: string;
      constructor(id, name) {
        this.id = id;
        this.name = name;
      }
      printDetails() {
        return `id: ${this.id}` + `, name ${this.name}`;
      }
    }

    class Manager {
      public id: number;
      public name: string;

      public employees: Employee[];
      constructor(id, name) {
        this.id = id;
        this.name = name;
      }
      printDetails() {
        return (
          `id: ${this.id} ` +
          `, name ${this.name}, ` +
          ` employeeCount ${this.employees.length}`
        );
      }
    }
    let jeff = new Employee(1, "jeff");
    let shavon = new Employee(2, "shavon");
    let yuk = new Manager(3, "yuk");
    yuk.employees = [jeff, shavon];
    expect(yuk.printDetails()).toBe("id: 3 , name yuk,  employeeCount 2");
  });
  it("abstract class to increase code reuse after", () => {
    abstract class Employee {
      public id: number;
      public name: string;
      constructor(id, name) {
        this.id = id;
        this.name = name;
      }
    }
    class RegularEmployee extends Employee {
      printDetails() {
        return `id: ${this.id}` + `, name ${this.name}`;
      }
    }

    class Manager extends Employee {
      public employees: Employee[];

      printDetails() {
        return (
          `id: ${this.id} ` +
          `, name ${this.name}, ` +
          ` employeeCount ${this.employees.length}`
        );
      }
    }
    let jeff = new RegularEmployee(1, "jeff");
    let shavon = new RegularEmployee(2, "shavon");
    let yuk = new Manager(3, "yuk");
    yuk.employees = [jeff, shavon];
    expect(yuk.printDetails()).toBe("id: 3 , name yuk,  employeeCount 2");
  });
});
