describe("basic", () => {
  it("parameter in typescript", () => {
    function testUndef(test) {
      console.log("test parameter :" + test);
    }

    //   testUndef();

    testUndef(undefined);
    testUndef(null);
  });
});
