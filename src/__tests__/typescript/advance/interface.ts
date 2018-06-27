describe("interface", () => {
  it("interface basic", () => {
    interface IComplexType {
      id: number;
      name: string;
    }
    let complexType: IComplexType;
    complexType = { id: 1, name: "test" };
    expect(complexType).toEqual({ id: 1, name: "test" });
  });
  it("interface with optional parameter", () => {
    interface IComplexType {
      id: number;
      name?: string;
    }
    let complexType: IComplexType;
    complexType = { id: 1 };
    expect(complexType).toEqual({ id: 1 });
  });
});
describe("use interface to achieve dependency inversion", () => {
  it("class basic", () => {
    //es6 with constructor will be called,actually is just function called with constructor pattern & prototype pattern
    class SimpleClass implements Speaker {
      id: number;
      constructor(id) {
        //the instance
        this.id = id;
      }
      print(): string {
        return `SimpleClass.print(${this.id}) called`;
      }
      do(): void {
        let a = "33";
      }
    }
    class ComplexClass implements Speaker {
      id: number;
      constructor(id) {
        //the instance
        this.id = id;
      }
      print(): string {
        return `ComplexClass.print(${this.id}) called`;
      }
      do(): void {
        let a = "33";
      }
      do2(): void {
        let a = "33";
      }
      do3(): void {
        let a = "33";
      }
      do4(): void {
        let a = "33";
      }
    }
    interface Speaker {
      print: () => string;
    }
    function print(speaker: Speaker) {
      return "speaker said" + speaker.print();
    }
    //cast to SimpleClass
    let mySimpleClass: Speaker = new SimpleClass(2);
    let myComplexClass: Speaker = new ComplexClass(2);

    expect(print(mySimpleClass)).toBe(
      "speaker saidSimpleClass.print(2) called"
    );
    expect(print(myComplexClass)).toBe(
      "speaker saidComplexClass.print(2) called"
    );
  });
});
