// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED

let _ = require("lodash");

describe("array-native & lodash", () => {
  it.only("gcd ", () => {
    var gcd = function(a, b) {
      console.log({ a, b });
      if (b == 0) {
        return a;
      }

      return gcd(b, a % b);
    };
    // expect(gcd(5, 10)).toEqual(5);
    expect(gcd(100, 5)).toEqual(5);
  });
  it("two gcd", () => {
    function generalizedGCD(num, arr) {
      // Use spread syntax to get minimum of array
      const lowest = Math.min(...arr);

      for (let factor = lowest; factor > 1; factor--) {
        let isCommonDivisor = true;

        for (let j = 0; j < num; j++) {
          if (arr[j] % factor !== 0) {
            isCommonDivisor = false;
            break;
          }
        }
        //brutal solve
        if (isCommonDivisor) {
          return factor;
        }
      }

      return 1;
    }
    expect(generalizedGCD(5, [2, 4, 6, 8, 10])).toEqual(2);
  });
});
