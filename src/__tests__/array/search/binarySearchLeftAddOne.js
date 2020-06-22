function binarySearchIterative(nums, target) {
  let lowIndex = 0;
  let highIndex = nums.length - 1;
  //just reduce to 2 elements
  while (lowIndex + 1 < highIndex) {
    let mid = parseInt((highIndex - lowIndex) / 2) + lowIndex;
    if (nums[mid] > target) {
      highIndex = mid;
    } else if (nums[mid] < target) {
      lowIndex = mid;
    } else {
      return mid;
    }
  }
  //pick the higher element between low&high
  if (target == nums[lowIndex]) {
    return lowIndex;
  } else if (target == nums[highIndex]) {
    return highIndex;
  }
  return -1;
}

describe("binary search <=", () => {
  it("iterative", () => {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(binarySearchIterative(nums, 2)).toEqual(1);
  });
});
