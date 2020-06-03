// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED

let _ = require("lodash");

describe("fib", () => {
  /*
dynamic programming tabulaization&memorization
    https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/

    */
  it("brute force recursion O(k^n)", () => {
    /*
deep left first

                               fib(5)   
                     /                \
               fib(4)                fib(3)   
             /        \              /       \ 
         fib(3)      fib(2)         fib(2)   fib(1)
        /    \       /    \        /      \
  fib(2)   fib(1)  fib(1) fib(0) fib(1) fib(0)
  /     \
fib(1) fib(0)

*/
    function fib(n) {
      if (n <= 1) {
        return n;
      }
      return fib(n - 1) + fib(n - 2);
    }
    expect(fib(9)).toBe(34);
  });
  it("recursion with memorization O(n),", () => {
    let cacheByN = {};
    function fib(n) {
      if (n <= 1) {
        return n;
      }
      if (cacheByN[n]) {
        return cacheByN[n];
      }
      let result = fib(n - 1) + fib(n - 2);
      cacheByN[n] = result;
      return cacheByN[n];
    }
    expect(fib(99)).toBe(218922995834555200000);
  });

  it("recursion with tabulation O(n),", () => {
    //memorization array
    let cacheByN = {};
    //parameter=>result
    //bottom result first,that's why called bottom up solution
    //
    cacheByN[0] = 0;
    cacheByN[1] = 1;
    function fib(n) {
      for (let i = 2; i <= n; i++) {
        cacheByN[i] = cacheByN[i - 1] + cacheByN[i - 2];
      }
      return cacheByN[n];
    }
    expect(fib(99)).toBe(218922995834555200000);
  });
  /*
https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/

god forbid formula
Time Complexity: O(1)
Space Complexity: O(1)
  */
});
