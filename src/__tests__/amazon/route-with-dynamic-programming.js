function getCombinations(forwardRouteList, returnRouteList) {
  let combinations = [];
  for (let i = 1; i <= forwardRouteList.length; i++) {
    for (let j = 1; j <= returnRouteList.length; j++) {
      let combination = [i, j];
      combinations.push(combination);
    }
  }
  return combinations;
}
function getDistance(combination, forwardRouteList, returnRouteList) {
  let forwardRoute = forwardRouteList[combination[0] - 1];
  let returnRoute = returnRouteList[combination[1] - 1];
  return forwardRoute[1] + returnRoute[1];
}
function optimalUtilization(maxTravelDist, forwardRouteList, returnRouteList) {
  if (forwardRouteList.length == 0 || returnRouteList.length == 0) {
    return [];
  }
  let combinations = getCombinations(forwardRouteList, returnRouteList);
  let possibleCombinationsByDistance = {};
  for (let combination of combinations) {
    const distance = getDistance(
      combination,
      forwardRouteList,
      returnRouteList
    );
    if (maxTravelDist >= distance) {
      if (possibleCombinationsByDistance[distance]) {
        possibleCombinationsByDistance[distance].push(combination);
      } else {
        possibleCombinationsByDistance[distance] = [combination];
      }
    }
  }
  if (Object.keys(possibleCombinationsByDistance).length === 0) {
    return [];
  }
  let maxDistance = 0;
  for (let distance of Object.keys(possibleCombinationsByDistance)) {
    maxDistance = Math.max(maxDistance, distance);
  }
  combinations = possibleCombinationsByDistance[maxDistance];
  combinations = combinations.filter(
    aCombination =>
      !aCombination.find(bCombination => bCombination[0] == aCombination[0])
  );
  combinations = combinations.filter(
    aCombination =>
      !aCombination.find(bCombination => bCombination[1] == aCombination[1])
  );
  return combinations;
}
describe("array-native & lodash", () => {
  it("get combinations", () => {
    expect(
      getCombinations([[1, 2000], [2, 4000], [3, 6000]], [[1, 2000]])
    ).toMatchObject([[1, 1], [2, 1], [3, 1]]);
  });
  it("get distance", () => {
    expect(
      getDistance([2, 1], [[1, 2000], [2, 4000], [3, 6000]], [[1, 2000]])
    ).toEqual(6000);
  });
  it("max ", () => {
    expect(
      optimalUtilization(7000, [[1, 2000], [2, 4000], [3, 6000]], [[1, 2000]])
    ).toMatchObject([[2, 1]]);
  });
});
