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
describe.only("make changes brute force", () => {
  it("recursive", () => {
    const coins = [10, 6, 1];
    function makeChange(nodeValue) {
      //12
      //base case
      if (nodeValue === 0) {
        console.log("returning 0");
        return 0;
      }
      let nodeMinCoin;
      //branching every time¸¸¸¸¸¸¸¸¸
      //it will get each
      coins.forEach(coin => {
        // 10
        if (nodeValue - coin >= 0) {
          //2
          console.log({ nodeMinCoin, coin });
          let lowerMinCoin = makeChange(nodeValue - coin);

          if (nodeMinCoin === undefined || lowerMinCoin < nodeMinCoin) {
            nodeMinCoin = lowerMinCoin;
          }
        }
      });
      console.log({ nodeMinCoin, nodeValue });
      //thats my totally mind game is correct , node value 2=>1, because at the last change will + 1 to make it two if it is the min
      //the answer is {nodeValue:12,minCoin:1}, and then the finally return +1 => 2
      return nodeMinCoin + 1;
    }
    expect(makeChange(12)).toEqual(2);
  });
  it("dynamic programing", () => {
    const coins = [10, 6, 1];
    let nodeMinCoinByNodeValue = {};
    function makeChange(nodeValue) {
      //12
      //base case
      if (nodeMinCoinByNodeValue[nodeValue]) {
        // console.log("finding and skiping", nodeMinCoinByNodeValue);
        return nodeMinCoinByNodeValue[nodeValue];
      }

      if (nodeValue === 0) return 0;
      let nodeMinCoin;
      //branching every time¸¸¸¸¸¸¸¸¸
      //it will get each
      coins.forEach(coin => {
        // 10
        if (nodeValue - coin >= 0) {
          //2
          let lowerMinCoin = makeChange(nodeValue - coin);
          if (nodeMinCoin === undefined || lowerMinCoin < nodeMinCoin) {
            nodeMinCoin = lowerMinCoin;
          }
        }
      });

      nodeMinCoinByNodeValue[nodeValue] = nodeMinCoin + 1;
      // console.log({ nodeMinCoin, nodeValue, nodeMinCoinByNodeValue });
      return nodeMinCoinByNodeValue[nodeValue];
    }

    let makeChangeRes = makeChange(12);
    // console.log({ nodeMinCoinByNodeValue });
    expect(nodeMinCoinByNodeValue).toEqual({
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 1,
      "7": 2,
      "8": 3,
      "9": 4,
      "10": 1,
      "11": 2,
      "12": 2
    });
    expect(makeChangeRes).toEqual(2);
  });
  it.only("deep", () => {
    var coinChange = function(coins, amount) {
      //same problem as make changes

      let nodeMinCoinByNodeValue = {};
      function makeChange(nodeValue) {
        if (nodeMinCoinByNodeValue[nodeValue]) {
          return nodeMinCoinByNodeValue[nodeValue];
        }
        if (nodeValue == 0) {
          return 0;
        }
        let nodeMinCoin;
        // console.log({ nodeValue });
        let hasAcceptableCoin = false;
        for (let coin of coins) {
          if (nodeValue - coin >= 0) {
            let lowerCoin = makeChange(nodeValue - coin);
            if (lowerCoin != undefined) {
              if (nodeMinCoin === undefined || lowerCoin < nodeMinCoin) {
                nodeMinCoin = lowerCoin;
              }
              hasAcceptableCoin = true;
            }

            // console.log({ lowerCoin, nodeMinCoin });
          }
        }
        if (!hasAcceptableCoin) {
          return undefined;
        }

        nodeMinCoinByNodeValue[nodeValue] = nodeMinCoin + 1;
        console.log(nodeMinCoinByNodeValue);
        return nodeMinCoinByNodeValue[nodeValue];
      }

      let res = makeChange(amount);

      if (isNaN(res)) {
        return -1;
      } else {
        return res;
      }
    };
    // expect(coinChange([2], 3));
    expect(coinChange([1, 2], 4)).toEqual(2);
    expect(coinChange([3, 2], 4)).toEqual(2);
    expect(coinChange([186, 419, 83, 408], 6249));
  });
});
