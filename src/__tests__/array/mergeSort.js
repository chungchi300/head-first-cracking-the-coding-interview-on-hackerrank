function merge(nums, low, mid, high) {
  let temp = [];
  let i = low;
  let j = mid + 1;
  let k = 0;
  while (i <= mid && j <= high) {
    if (nums[i] < nums[j]) {
      temp[k++] = nums[i++];
    } else {
      temp[k++] = nums[j++];
    }
  }
  while (i <= mid) {
    temp[k++] = nums[i++];
  }
  while (j <= high) {
    temp[k++] = nums[j++];
  }
  for (let x = 0; x < temp.length; x++) {
    nums[x + low] = temp[x];
  }
}
/*
 a recursion function again,
 very powerful divide&conquer&combine&using tree data structure as call stack(implicitly)


*/
function mergeSort(nums, low, high) {
  /*
  very powerful
  time complexity:
  Best: O(nlogn)
  Worst: O(nlogn)
  Average: O(nlogn)
  Space complexity

  */
  let mid = parseInt((low + high) / 2);
  if (low < high) {
    mergeSort(nums, low, mid);
    mergeSort(nums, mid + 1, high);
    merge(nums, low, mid, high);
  }
  return nums.filter((num) => num);
}

describe("array-native & lodash", () => {
  it("worst", () => {
    let nums = [5, 2, 9, 4, 7, 6, 1, 3, 8];
    expect(mergeSort(nums, 0, nums.length)).toEqual([
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
