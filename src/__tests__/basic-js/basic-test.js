const EventEmitter = require("events");

let debug = require("debug");
var validator = require("validator");
debug.enable("*");
let LOGV = debug("test");
import _ from "lodash";
describe("async ", () => {
  it("test-sample", () => {
    expect(true).toBeTruthy();
  });
  it("object change", () => {
    let app = {
      user: {
        name: "jeff",
        age: 20
      },
      ordersById: {
        o1: {
          id: "o1",
          total: 500,
          itemCount: 10
        },
        o2: {
          id: "o2",
          total: 200,
          itemCount: 2
        }
      }
    };
    let oldRef = app;
    app.ordersById.o1.total = 22;
    expect(oldRef.ordersById.o1 == app.ordersById.o1).toBe(true);
  });
  it("test promise & async await", async () => {
    let rqDimensionPromise = ms => {
      let asyncPromiseObj = new Promise(resolve => {
        let dimensions = ["Hong Kong", "China", "ShenZhen", "Taiwan"];
        //the async function wrapper in promise for chaining
        setTimeout(resolve(dimensions), ms);
      });
      return asyncPromiseObj;
    };

    let rqDistrictPromise = ms => {
      let asyncPromiseObj = new Promise(resolve => {
        let districts = ["Hong Kong", "China", "ShenZhen", "Taiwan"];
        //the async function wrapper in promise for chaining
        setTimeout(resolve(districts), ms);
      });
      return asyncPromiseObj;
    };

    let dimensionsFromPromise;

    let districstsFromPromise;
    rqDimensionPromise(100)
      .then(res => {
        dimensionsFromPromise = res;
        return rqDistrictPromise(100);
      })
      .then(res => {
        districstsFromPromise = res;
        LOGV("promise", districstsFromPromise, dimensionsFromPromise);
      })
      .catch(e => {
        LOGV("promise fail");
      });
    try {
      let rqDimensionAsyn = await rqDimensionPromise(100);
      expect(rqDistrictAsyn[0]).toBe("Hong Konsg");
      LOGV("async dimension ", rqDimensionAsyn);
      let rqDistrictAsyn = await rqDistrictPromise(100);
      LOGV("async districts ", rqDistrictAsyn);
    } catch (e) {
      LOGV("async fail");
    }
  });

  it("test-http-response-to-map", () => {
    //     console.log(new Map(res.response.headers.entries()));
    // [...headers.entries()] or Array.from(headers.entries())
    //         console.log(res.response.headers.get('content-type'));
  });

  it("test-internal-function", () => {
    function betterExampleNeeded() {
      var a = 1;
      function oneMoreThanA() {
        return a + 1;
      }
      return oneMoreThanA() + 10;
    }
    expect(12).toBe(betterExampleNeeded());

    expect(typeof betterExampleNeeded === "function").toBe(true);

    expect(typeof oneMoreThanA === "function").toBe(false);
  });
  //In javascript.a  function that make function,the maked function remember the scope that are created

  it("test-array-spread-to-turn-array-to-multiple-array-params", () => {
    class Person {
      constructor(givenName, surnName) {
        //object instead on object prototype
        this.givenName = givenName;
        this.sureName = surnName;
      }
    }

    let info = ["jeff", "chung"];
    let jeff = new Person(...info);
    expect("jeff").toBe(jeff.givenName);
    expect("chung").toBe(jeff.sureName);
  });

  //jsx has spread operator but it is not the same implementation,the Compiler do completely different job
  it("call-function-using-object-property-as-parameter-which-is-useless-because-function-based-on-position", () => {});
  it("test-array-rest-to-turn-params-in-function-to-arr", () => {
    class Person {
      constructor(...name) {
        //object instead on object prototype
        this.givenName = name[0];
        this.sureName = name[1];
      }
    }

    let jeff = new Person("jeff", "chung");
    expect("jeff").toBe(jeff.givenName);
    expect("chung").toBe(jeff.sureName);
  });

  it("test-promise-single", () => {
    //direct create a promise object to represent a async operation
    var promiseOperationObj = new Promise((resolve, reject) => {
      let total = 0;
      for (let i = 0; i < 100; i++) {
        total += i;
      }
      //resolve definition
      resolve(total);
    });
    //start asyn  operation in promise,check resolve or not
    return promiseOperationObj.then(
      result => {
        expect(4950).toBe(result);
      },
      onResolveFailPara => {
        LOGV("error");
      }
    );
  });
  it("test-promise-chain", () => {
    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });
    return promise
      .then(function(val) {
        // console.log(val); // 1
        return val + 2;
      })
      .then(function(val) {
        // console.log(val);
        expect(3).toBe(val);
      });
  });
  it("test-promise-chain-by-resolve-promise-staff", () => {
    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });
    function createPromiseObj2(previous) {
      return new Promise((resolve, reject) => {
        resolve(previous + 2);
      });
    }
    return promise
      .then(function(val) {
        // console.log(val); // 1
        return createPromiseObj2(val);
      })
      .then(function(val) {
        // console.log(val);
        expect(3).toBe(val);
      });
  });
  it("test-custom-promise-chain-by-then", () => {
    //direct create a promise object to represent a async operation
    var promiseOperationObj = new Promise((resolve, reject) => {
      let total = 0;
      for (let i = 0; i < 100; i++) {
        total += i;
      }
      resolve(total);
    });

    return promiseOperationObj
      .then(result => {
        let total = 0;

        for (let i = 0; i < 50; i++) {
          total += i;
        }
        return total + result;
      })
      .then(sum => {
        expect(6175).toBe(sum);
      });
  });
  it("test-custom-promise-chain", () => {
    //direct create a promise object to represent a async operation
    var promiseOperationObj = new Promise((resolve, reject) => {
      let total = 0;
      for (let i = 0; i < 100; i++) {
        total += i;
      }
      resolve(total);
    });
    var CreatePromiseObj2 = function(previous) {
      return new Promise(function(resolve, reject) {
        let total = 0;
        for (let i = 0; i < 50; i++) {
          total += i;
        }

        total = total + previous;
        resolve(total);
      });
    };
    return promiseOperationObj
      .then(result => {
        let promiseOperationObj2 = new CreatePromiseObj2(result);
        return promiseOperationObj2;
      })
      .then(sum => {
        expect(6175).toBe(sum);
      });
  });

  it("test-scope-global", () => {
    var a = 1;

    // global scope
    function one() {
      return a;
    }
    expect(1).toBe(one());
  });
  it("test-scope-local", () => {
    var a = 1;
    function two(a) {
      //the function scope,parameter a has higher scope
      return a; // alerts the given argument, not the global value of '1'
    }

    // local scope again
    function three() {
      var a = 3;
      return a; // alerts '3'
    }
    expect(2).toBe(two(2));
    expect(3).toBe(three());
  });
  it("test-intermediate-local-scope-due-to-variable-increase", () => {
    var a = 1;

    function four() {
      if (true) {
        var a = 4;
      }

      return a; // alerts '4', not the global value of '1'
    }
    /*reality

  function four() {
    var a;
    if (true) {
      a = 4;
    }

    return (a); // alerts '4', not the global value of '1'
  }
  */
    expect(4).toBe(four());
  });
  it("test-object-scope", () => {
    var a = 1;

    function Five() {
      this.a = 5;
    }
    let ins = new Five();
    expect(5).toBe(ins.a);
  });
  it("test-closure-scope", () => {
    var a = 1;
    var createClosureOfSpecificNum6 = function() {
      var a = 6;
      return function() {
        return a;
      };
    };
    var functionHaveLocalScope = createClosureOfSpecificNum6();
    expect(6).toBe(functionHaveLocalScope());
  });
  it("test-scope-increment", () => {
    var foo = 1;
    function bar() {
      //referencing the local scope variable object(because it is declare here) foo which is undefined

      if (foo === undefined) {
        // LOGV('changing the local scope foo');
        var foo = 10;
      }
      return foo;
    }
    expect(10).toBe(bar());
  });
  it("test-scope-increment-of-let-not-happen", () => {
    var foo = 1;
    function bar() {
      if (foo === undefined) {
        LOGV("changing the local scope foo");
        let foo = 10;
      }
      return foo;
    }
    expect(1).toBe(bar());
  });
  it("test-error-handling-in-debug-mode-should-reflow", () => {
    const debug = true;
    function errorCall() {
      var foo = {};
      return foo.bar();
    }
    //
    try {
      errorCall();
    } catch (ex) {
      if (debug) {
        expect(true).toBeTruthy();
        //throw ex;
      } else {
        expect(false).toBeTruthy();
      }
    }
  });
});
// class Action{
//
// }
// function openDrawer():Action {
//   return {
//     type: 'OpenDrawer',
//   };
// }
