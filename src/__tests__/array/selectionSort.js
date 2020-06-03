function getLastIndex(nums) {
  return nums.length - 1;
}
function move1ElementToFinalCorrectPositionOptimized(
  unSortedElementFirstPosition,
  nums
) {
  //stop at i because before i is already adjusted at correct position
  let minIndex = unSortedElementFirstPosition;
  //find the min
  for (let j = unSortedElementFirstPosition + 1; j < nums.length; j++) {
    if (nums[j] < nums[minIndex]) {
      minIndex = j;
    }
  }
  //use the min
  if (minIndex != unSortedElementFirstPosition) {
    let temp = nums[unSortedElementFirstPosition];
    nums[unSortedElementFirstPosition] = nums[minIndex];
    nums[minIndex] = temp;
  }
}

function selectionSort(nums) {
  //looping every element, except the last, in each loop, 1 element move to correct position
  /*
        Time complexity
        Best: O(n^2)
        Worst: O(n^2)
        Average: O(n^2)
        Stable:Unstable

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
    expect(selectionSort([5, 2, 9, 4, 7, 6, 1, 3, 8])).toEqual([
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
  it("best", () => {
    expect(selectionSort([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
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
