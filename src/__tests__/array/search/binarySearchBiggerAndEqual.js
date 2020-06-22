function binarySearchRecursive(nums, lowIndex, highIndex, target) {
  if (highIndex <= lowIndex) {
    return -1;
  }
  let midIndex = lowIndex + parseInt((highIndex - lowIndex) / 2);

  if (nums[midIndex] > target) {
    return binarySearchRecursive(nums, lowIndex, midIndex - 1, target);
  } else if (nums[midIndex] < target) {
    return binarySearchRecursive(nums, midIndex + 1, highIndex, target);
  } else {
    //means equals,because not bigger and not smaller
    return midIndex;
  }
}
function binarySearchIterative(nums, target) {
  let lowIndex = 0;
  let highIndex = nums.length - 1;
  while (lowIndex <= highIndex) {
    let midIndex = parseInt((highIndex - lowIndex) / 2) + lowIndex;
    // console.log({
    //   mid: midIndex,
    //   middleElement: nums[midIndex],
    //   target: target,
    // });
    if (nums[midIndex] > target) {
      // console.log(
      //   "middle element bigger then target element lowIndex remain unchanged, but highIndex adjusted to midIndex"
      // );
      highIndex = midIndex - 1;
    } else if (nums[midIndex] < target) {
      // console.log(
      //   "middle element smaller then target element highIndex remain unchanged, but lowIndex adjusted to midIndex"
      // );
      lowIndex = midIndex + 1;
    } else {
      return midIndex;
    }
  }
  return -1;
}

describe("binary search <=", () => {
  it("recursion", () => {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(binarySearchRecursive(nums, 0, nums.length, 5)).toEqual(4);
  });
  it("iterative", () => {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(binarySearchIterative(nums, 2)).toEqual(1);
  });
});
