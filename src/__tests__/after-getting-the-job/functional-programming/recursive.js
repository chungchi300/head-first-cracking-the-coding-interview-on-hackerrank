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
  it.only("accumulator pattern", () => {
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
});
