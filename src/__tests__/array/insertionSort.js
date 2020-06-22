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
    for (let sortingItem = i + 1; sortingItem > 0; sortingItem--) {
      if (nums[sortingItem] < nums[sortingItem - 1]) {
        let temp = nums[sortingItem - 1];
        nums[sortingItem - 1] = nums[sortingItem];
        nums[sortingItem] = temp;
      } else {
        break;
      }
    }

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
