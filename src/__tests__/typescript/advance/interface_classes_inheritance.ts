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
describe("class", () => {
  it("class basic", () => {
    //es6 with constructor will be called,actually is just function called with constructor pattern & prototype pattern
    class SimpleClass {
      id: number;
      constructor(id) {
        this.id = id;
      }
      print(): string {
        return `SimpleClass.print(${this.id}) called`;
      }
    }
    let mySimpleClass = new SimpleClass(2);
    expect(mySimpleClass.print()).toBe("SimpleClass.print(2) called");
  });
});
