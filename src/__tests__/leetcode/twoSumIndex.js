describe("compose", () => {
  it("seagull es6", () => {
    var twoSum = function(nums, target) {
      /* 

[2, 7, 11, 15], target = 9,
remove useless compare for searching , we search by remainder efficiently

{
    remainder:numIndexPos
    7:0
}

*/

      let previousNumPosByReminder = {};
      for (let i = 0; i <= nums.length; i++) {
        const num = nums[i];
        if (previousNumPosByReminder[num] !== undefined) {
          return [previousNumPosByReminder[num], i];
        } else {
          previousNumPosByReminder[target - num] = i;
        }
      }
    };
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });
});
