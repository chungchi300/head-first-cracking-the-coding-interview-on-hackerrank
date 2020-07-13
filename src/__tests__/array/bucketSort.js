function getMaxMin(nums) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  for (let num of nums) {
    min = Math.min(min, num);
    max = Math.max(max, num);
  }
  let bucketNum = Math.floor((max - min) / nums.length) + 1;
  let buckets = [];
  // console.log({ bucketNum });
  for (let i = 0; i < bucketNum; i++) {
    buckets.push([]);
  }
  return { min, max, buckets };
}
function bucketSort(nums) {
  if (!nums || nums.length == 0) {
    return nums;
  }
  //looping every element, except the last, in each loop, 1 element move to correct position
  /*
        Time complexity
      
        Average: O(n)
       
  */

  let { max, min, buckets } = getMaxMin(nums);

  for (let i = 0; i < nums.length; i++) {
    let bucketIndex = Math.floor((nums[i] - min) / nums.length);
    buckets[bucketIndex].push(nums[i]);
  }
  let res = [];
  for (let bucket of buckets) {
    bucket.sort();
    for (let num of bucket) {
      res.push(num);
    }
  }

  return res;
}
describe("array-native & lodash", () => {
  it("worst", () => {
    expect(bucketSort([1, 2, 3, 4, 20, 5, 6, 7, 8, 9])).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      20,
    ]);
  });
});
