function getMax(nums) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let num of nums) {
    max = Math.max(max, num);
  }
  return max;
}
//high speed access
function createOccurrenceArrKeyByExactNum(max, nums) {
  console.log({ max });
  let occurrenceArr = new Array(max + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    occurrenceArr[num] = occurrenceArr[num] + 1;
  }
  return occurrenceArr;
}

// low speed access
function convertOccurenceArrThatResetOldArray(max, occurrenceArr, nums) {
  let index = 0;
  for (let i = 0; i <= max; i++) {
    //if already have value, restore back the number, a pushing that with reset
    for (let j = 0; j < occurrenceArr[i]; j++) {
      nums[index++] = i;
    }
  }
  return nums;
}

function countSort(nums) {
  if (!nums || nums.length == 0) {
    return nums;
  }
  //looping every element, except the last, in each loop, 1 element move to correct position
  /*
        Time complexity
        Best: O(n,skip in one place)
        Worst: O(n^2)
        Average: O(n^2)
        Stable:Unstable

  */

  let max = getMax(nums);
  let occurrenceArr = createOccurrenceArrKeyByExactNum(max, nums);
  nums = convertOccurenceArrThatResetOldArray(max, occurrenceArr, nums);

  return nums;
}
describe("array-native & lodash", () => {
  it("worst", () => {
    expect(countSort([5, 2, 9, 4, 7, 6, 1, 3, 8])).toEqual([
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
