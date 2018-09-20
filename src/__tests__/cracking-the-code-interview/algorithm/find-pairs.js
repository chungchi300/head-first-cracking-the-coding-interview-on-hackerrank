describe("count", () => {
  it("no repeat", () => {
    function findPairNoRepeat(arr, sum) {
      let pairs = {};
      for (let num of arr) {
        const complement = sum - num;
        if (complement in pairs) {
          //add to previous paired element,rewrite for existing path so no duplication
          pairs[complement] = num;
        } else {
          if (pairs[num] === undefined) {
            //put pair to map left
            pairs[num] = null;
          }
        }
      }

      return Object.keys(pairs).map(function(num) {
        return [Number(num), pairs[num]].sort();
      });
    }
    expect(
      findPairNoRepeat([2, 2, 3, 3, 2, 2, 1], 4).sort(arr => arr[0])
    ).toEqual([[1, 3], [2, 2]]);
  });
  it(" repeatable", () => {
    function findPairRepeat(arr, sum) {
      let pairs = {};
      let mappedPairs = [];
      for (let num of arr) {
        const complement = sum - num;

        if (complement in pairs) {
          //add to previous paired element,rewrite for existing path so no duplication
          delete pairs[num];

          mappedPairs.push([complement, num].sort());
        } else {
          //put pair to map left
          pairs[num] = undefined;
        }
      }
      return mappedPairs;
    }
    expect(
      findPairRepeat([2, 2, 3, 3, 2, 2, 1], 4).sort(arr => arr[0])
    ).toEqual([[1, 3], [2, 2], [2, 2]]);
  });
});
