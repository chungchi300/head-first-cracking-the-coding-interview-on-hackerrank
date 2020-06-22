function getLastIndex(nums) {
  return nums.length - 1;
}

function insertionSort(nums) {
  //looping every element, except the last, in each loop, 1 element move to correct position
  /*
        Time complexity
        Best: O(n,skip in one place)
        Worst: O(n^2)
        Average: O(n^2)
        Stable:Unstable

  */
  for (let i = 0; i < nums.length - 1; i++) {
    console.log("first round before", nums);
    let elementThatGoingToPutInSortedArray = nums[i + 1];
    let low = 0;
    let highestAndSmallerThenSortingElementInSortedArray = i;
    while (low <= highestAndSmallerThenSortingElementInSortedArray) {
      let mid = parseInt(
        (low + highestAndSmallerThenSortingElementInSortedArray) / 2
      );
      if (nums[mid] < elementThatGoingToPutInSortedArray) {
        low = mid + 1;
      } else {
        highestAndSmallerThenSortingElementInSortedArray = mid - 1;
      }
    }
    //

    //moving all elements of target insert position to right
    for (let j = i; j > highestAndSmallerThenSortingElementInSortedArray; j--) {
      nums[j + 1] = nums[j];
    }
    //space left out and can been use
    nums[
      highestAndSmallerThenSortingElementInSortedArray + 1
    ] = elementThatGoingToPutInSortedArray;

    console.log("first round after", nums);
  }
  return nums;
}
describe("array-native & lodash", () => {
  it("worst", () => {
    expect(insertionSort([5, 2, 9, 4, 7, 6, 1, 3, 8])).toEqual([
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
