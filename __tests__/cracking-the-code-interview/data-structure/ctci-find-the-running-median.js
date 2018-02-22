describe('All', () => {
  it('Feasible,same speed when calculate array median,but slower when the array is succseively added new element and get median(lower complexity)', () => {
    function calculateMedian(arr) {
      //is even
      arr.sort((num1, num2) => {
        return num1 >= num2;
      });
      let mediumNumber = arr.length / 2;
      if (arr.length == 1) {
        return arr[0];
      }
      if (Number.isInteger(mediumNumber)) {
        const mediumNumberPos = mediumNumber - 1;
        //  console.log(arr,mediumNumberPos);
        return (arr[mediumNumberPos] + arr[mediumNumberPos + 1]) / 2;
      } else {
        const mediumNumberPos = Math.ceil(mediumNumber - 1);
        //  console.log(arr,mediumNumberPos);

        return arr[mediumNumberPos];
      }
    }
    //
    expect(calculateMedian([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5.5);
  });
  it('highest speed array is succseively added new element and get median(higher complexity)', () => {
    //maintain max(store the lower half) heap & min heap(store the higher half)
    //when new element added,
    //Balanced(max&min heap same size),put it to max heap or min heap is okay
    //Unbalanced,put it to smaller size heap,
  });
});
