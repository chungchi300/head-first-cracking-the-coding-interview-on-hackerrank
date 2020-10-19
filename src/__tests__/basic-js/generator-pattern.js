var util = require("util");
describe("extra", () => {
  it("generator, it nature's is declare an generator object", () => {
    function* generatorFn() {}
    const g = generatorFn();
    console.log(g); // generatorFn {<suspended>}
    console.log(g.next); // f next() { [native code] }
  });
  it("generator object work in basic", () => {
    function* generatorFn() {
      console.log("run1");
      let a = 3;
      console.log("run2");
      let b = yield 4;
      console.log("run3");

      return a + b;
    }
    const g = generatorFn();
    //next,run reach next yield, which can temporarily visitable via iterator pattern
    expect(g.next()).toEqual({ value: 4, done: false });
  });
  it("generator object work in basic", () => {
    function* generatorFn() {
      console.log("run1");
      let a = 3;
      console.log("run2");
      let b = yield 4;
      console.log("run3");

      return a + b;
    }
    const g = generatorFn();
    //next,run reach next yield, which can temporarily visitable via iterator pattern
    expect(g.next()).toEqual({ value: 4, done: false });
  });

  it("generator object try real", () => {
    function* generatorFn() {
      yield "foo";
      let c = yield "bar";
      console.log("c", c);
      return "baz";
    }
    const g = generatorFn();
    //next,run reach next yield, which can temporarily visitable via iterator pattern
    expect(g.next()).toEqual({ value: "foo", done: false });
    expect(g.next()).toEqual({ value: "bar", done: false });
    g.next();
    // console.log({ g: g() });
    // expect(g.next()).toEqual({ value: "baz", done: false });
  });
  it("generator object yield with * for iterabkle", () => {
    function* generatorFn() {
      yield* [1, 2, 3];
      console.log("done");
      return "baz";
    }
    const g = generatorFn();
    //next,run reach next yield, which can temporarily visitable via iterator pattern
    expect(g.next()).toEqual({ value: 1, done: false });
    expect(g.next()).toEqual({ value: 2, done: false });
    expect(g.next()).toEqual({ value: 3, done: false });

    g.next();

    // console.log({ g: g() });
    // expect(g.next()).toEqual({ value: "baz", done: false });
  });
  it("generation", () => {
    function* getMeDrink() {
      console.log("run");
      //yield , generate value  out
      let question1 = yield "soda or beer"; // execution will pause here because of yield

      if (question1 == "soda") {
        return "here you get your soda";
      }

      if (question1 == "beer") {
        let question2 = yield "whats your age"; // execution will pause here because of yield

        if (question2 > 18) {
          return "ok you are eligible for it";
        } else {
          return "Shhhh!!!!";
        }
      }
    }

    let _getMeDrink = getMeDrink(); // initialize it
    //reach first yield & return middle value
    expect(_getMeDrink.next().value).toBe("soda or beer"); // "soda or beer"
    //reach second value with first yield return value
    expect(_getMeDrink.next("beer").value).toBe("whats your age"); // "soda or beer"
    expect(_getMeDrink.next(20).value).toBe("ok you are eligible for it"); // "soda or beer"
  });
  it("generation", () => {
    function* getMeDrink() {
      console.log("run");
      //yield , generate value  out first, then wait for incoming value until next call
      let incomeValue = yield "life";
      return incomeValue;
    }

    let _getMeDrink = getMeDrink(); // initialize it
    //reach first yield & return middle value
    expect(_getMeDrink.next().value).toBe("life"); //
    expect(_getMeDrink.next(" is good").value).toBe(" is good"); //
  });
  it.only("generator with promise", () => {
    function* getMeDrink() {
      console.log("run");
      //yield , generate value  out first, then wait for incoming value until next call
      let incomeValue = yield new Promise((resolve, reject) => {
        console.log("promise run");
        resolve("life");
      });
      console.log("incoming value", incomeValue);
      return incomeValue;
    }
    //my manual generator executor
    let g = getMeDrink();
    g.next()
      .value.then((value) => {
        return g.next(value).value;
      })
      .then((final) => console.log({ final }));
    //in generator executor like, they create the g instance, then repeatly next it, if they know something is promise, they will return the result to it by promise, and finally return the value
  });
});
