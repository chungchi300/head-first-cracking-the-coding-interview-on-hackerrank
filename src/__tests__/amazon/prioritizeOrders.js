let _ = require("lodash");
// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED

function isPrime(order) {
  //first is id,
  let infos = order.split(" ").splice(1);
  //all additional number is numeric, return false
  for (let i = 0; i < infos.length; i++) {
    if (isNaN(infos[i])) {
      return true;
    } else {
      return false;
    }
  }

  //else return true;
}
function sortOrders(orderList) {
  return orderList.sort((a, b) => {
    let aStr = a
      .split(" ")
      .splice(1)
      .join(" ");
    let bStr = b
      .split(" ")
      .splice(1)
      .join(" ");
    const compareRes = aStr.localeCompare(bStr);
    if (compareRes !== 0) {
      return compareRes;
    } else {
      return a.split(" ")[0].localeCompare(b.split(" ")[0]);
    }
  });
}
function prioritizedOrders(numOrders, orderList) {
  let primeList = [];
  let nonPrimeList = [];
  for (let i = 0; i < numOrders; i++) {
    const order = orderList[i];
    if (isPrime(order)) {
      primeList.push(order);
    } else {
      nonPrimeList.push(order);
    }
  }
  primeList = sortOrders(primeList);
  nonPrimeList = nonPrimeList;
  return [].concat(primeList, nonPrimeList);
  // WRITE YOUR CODE HERE
}
// FUNCTION SIGNATURE ENDS

// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED

describe("array-native & lodash", () => {
  it("is prime ", () => {
    expect(isPrime("zld 93 12")).toEqual(false);
    expect(isPrime("fp kindle book")).toEqual(true);
  });
  it("prime list", () => {
    expect(
      prioritizedOrders(4, [
        "mi2 jog mid pet",
        "wz3 34 54 398",
        "al alps cow bar",
        "x4 45 21 7"
      ])
    ).toEqual([
      "al alps cow bar",
      "mi2 jog mid pet",
      "wz3 34 54 398",
      "x4 45 21 7"
    ]);

    expect(
      prioritizedOrders(6, [
        "t2 13 121 98",
        "r1 box ape bit",
        "b4 xi me nu",
        "br8 eat nim did",
        "w1 has uni qry",
        "f3 52 54 31"
      ])
    ).toEqual([
      "r1 box ape bit",
      "br8 eat nim did",
      "w1 has uni qry",
      "b4 xi me nu",
      "t2 13 121 98",
      "f3 52 54 31"
    ]);
  });
});
