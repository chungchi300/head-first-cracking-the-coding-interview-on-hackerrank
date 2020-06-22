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
  let highIndex = nums.length; // [lowIndex,highIndex), cannot access rightIndex
  while (lowIndex < highIndex) {
    //stop when lowIndex = highIndex
    let mid = parseInt((highIndex - lowIndex) / 2) + lowIndex;
    if (nums[mid] > target) {
      highIndex = mid; //[lowIndex  , mid)
    } else if (nums[mid] < target) {
      lowIndex = mid + 1; //[mid+1,highIndex]
    } else {
      return mid;
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
    expect(binarySearchRecursive(nums, 0, nums.length, 5)).toEqual(4);
  });
});
