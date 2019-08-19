// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED

let _ = require("lodash");

describe("greedy", () => {
  it("make change iterative", () => {
    //assume the coins is sorted descending
    function makeChanges(availableCoinTypes, amount) {
      availableCoinTypes.sort((a, b) => b - a);
      let coins = [];
      let availableCoinTypeIndex = 0;
      while (amount != 0) {
        let availableCoinType = availableCoinTypes[availableCoinTypeIndex];
        if (amount >= availableCoinType) {
          amount -= availableCoinType;
          coins.push(availableCoinType);
        } else {
          availableCoinTypeIndex++;
        }
      }
      return coins;
    }
    expect(makeChanges([10, 5, 25], 50)).toEqual([25, 25]);
    //but the greedy looks bad when local optimal is not global optimal
    // but the global optimal is 6,6
    expect(makeChanges([1, 6, 10], 12)).toEqual([10, 1, 1]);
  });
  it("make change accumulator ", () => {
    //assume the coins is sorted descending
    function makeChanges(availableCoinTypes, amount) {
      availableCoinTypes.sort((a, b) => b - a);
      let coins = [];
      let availableCoinTypeIndex = 0;
      function recursive(amount) {
        if (amount == 0) {
          return coins;
        } else {
          let availableCoinType = availableCoinTypes[availableCoinTypeIndex];
          if (amount >= availableCoinType) {
            coins.push(availableCoinType);
            return recursive(amount - availableCoinType);
          } else {
            console.log("adding index");
            //pretty not pure recursive function
            availableCoinTypeIndex++;
            return recursive(amount);
          }
        }
      }

      return recursive(amount);
    }
    expect(makeChanges([10, 5, 25], 55)).toEqual([25, 25, 5]);
    //but the greedy looks bad when local optimal is not global optimal
    // but the global optimal is 6,6
    expect(makeChanges([1, 6, 10], 12)).toEqual([10, 1, 1]);
  });
});
describe("make changes brute force", () => {
  it("recursive", () => {
    const coins = [10, 6, 1];
    function makeChange(value) {
      //12
      //base case
      if (value === 0) return 0;
      let nodeMinCoin;
      //branching every time¸¸¸¸¸¸¸¸¸
      //it will get each
      coins.forEach(coin => {
        // 10
        if (value - coin >= 0) {
          //2
          let lowerMinCoin = makeChange(value - coin);
          if (nodeMinCoin === undefined || lowerMinCoin < nodeMinCoin) {
            nodeMinCoin = lowerMinCoin;
          }
        }
      });
      return nodeMinCoin + 1;
    }
    expect(makeChange(12)).toEqual(2);
  });
});
