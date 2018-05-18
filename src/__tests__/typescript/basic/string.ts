describe("basic", () => {
  it("replace", () => {
    let name = "hello world";
    function hello(name: string) {
      return name.replace("world", "start");
    }
    expect(hello(name)).toBe("hello start");
  });
});
