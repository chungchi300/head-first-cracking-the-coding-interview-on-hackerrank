let _ = require("lodash");
describe("recursive", () => {
  it("factorial", () => {
    function computeFactorial(n) {
      //base case
      if (n == 1) {
        return 1;
      } else {
        //recursive case,& make it closer
        return n * computeFactorial(n - 1);
      }
    }
    expect(computeFactorial(5)).toBe(120);
  });
  it("factorial with cache closure", () => {
    function computeFactorial(n) {
      //base case
      if (n == 1) {
        return 1;
      } else {
        //recursive case,& make it closer
        return n * computeFactorial(n - 1);
      }
    }

    function computeFactorialWithCacheClosure() {
      let cache = {};
      return n => {
        if (!cache[n]) {
          cache[n] = computeFactorial(n);
        } else {
          console.log("getting from cache");
        }
        return cache[n];
      };
    }
    let computeFactorialWithCache = computeFactorialWithCacheClosure();
    expect(computeFactorialWithCache(5)).toBe(120);
    expect(computeFactorialWithCache(5)).toBe(120);
  });
  it.only("factorial with cache generic", () => {
    function computeFactorial(n) {
      //base case
      if (n == 1) {
        return 1;
      } else {
        //recursive case,& make it closer
        return n * computeFactorial(n - 1);
      }
    }

    function memorizeThatFunctionFirstParamsAsKeyAndParam(fn) {
      let cache = {};
      return (...args) => {
        let n = args[0];

        if (n in cache) {
          console.log("getting from cache");
          return cache[n];
        } else {
          console.log("calculating result");
          cache[n] = fn(n);

          return cache[n];
        }
      };
    }
    let computeFactorialWithCache = memorizeThatFunctionFirstParamsAsKeyAndParam(
      computeFactorial
    );
    expect(computeFactorialWithCache(5)).toBe(120);
    expect(computeFactorialWithCache(5)).toBe(120);
  });
  it("logNumberRecursively using upper scape,wrapper pattern", () => {
    function logNum(start, end) {
      function recursiveLog(i) {
        if (i <= end) {
          //repeating recursive case, that make it closer
          console.log("num", i);
          recursiveLog(i + 1);
        } else {
          //base case
          console.log("end");
        }
      }
      recursiveLog(start);
    }
    logNum(1, 3);
  });
  it("accumulator pattern", () => {
    function joinElements(array, joinString) {
      function recurse(index, resultSoFar) {
        resultSoFar += array[index];
        if (index === array.length - 1) {
          //base case
          return resultSoFar;
        } else {
          //recurse case, the index + 1 & resultSoFar(thats why we call it accumulator make it closer,
          let newResultStr = resultSoFar + joinString;
          return recurse(index + 1, newResultStr);
        }
      }
      return recurse(0, "");
    }
    expect(joinElements(["s", "cr", "t code", " :) :)"], "e")).toEqual(
      "secret codee :) :)"
    );
  });
  it("accumulator pattern to iterative", () => {
    function joinElements(array, joinString) {
      let resultSoFar = "";
      //the base case is the exit
      for (let i = 0; i < array.length - 1; i++) {
        //recurse case
        resultSoFar += array[i] + joinString;
      }
      return resultSoFar + array[array.length - 1];
    }
    expect(joinElements(["s", "cr", "t code", " :) :)"], "e")).toEqual(
      "secret codee :) :)"
    );
  });
});
