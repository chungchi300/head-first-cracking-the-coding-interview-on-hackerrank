function getLastIndex(nums) {
  return nums.length - 1;
}
function move1ElementToFinalCorrectPositionOptimized(
  unSortedElementStartPosition,
  nums
) {
  //stop at i because before i is already adjusted at correct position
  let hasSwapping = false;
  for (let j = getLastIndex(nums); j > unSortedElementStartPosition; j--) {
    //this loop always make smallest element moves to unSortedElementStartPosition
    //do swapping even unrelated order operation, that's why this is unstable algorithm
    if (nums[j] <= nums[j - 1]) {
      let temp = nums[j];
      nums[j] = nums[j - 1];
      nums[j - 1] = temp;
      hasSwapping = true;
    }
  }
  if (hasSwapping == false) {
    return "no swapping";
  }
}

function bubbleSort(nums) {
  //looping every element, except the last, in each loop, 1 element move to correct position
  /*
        Time complexity
        Best: O(n)
        Worst: O(n^2)
        Average: O(n^2)


  */
  for (let i = 0; i < nums.length - 1; i++) {
    console.log("first round before", nums);
    if (move1ElementToFinalCorrectPositionOptimized(i, nums) == "no swapping") {
      return nums;
    }

    console.log("first round after", nums);
  }
  return nums;
}
describe("array-native & lodash", () => {
  it("worst", () => {
    expect(bubbleSort([5, 2, 9, 4, 7, 6, 1, 3, 8])).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ]);
  });
});
