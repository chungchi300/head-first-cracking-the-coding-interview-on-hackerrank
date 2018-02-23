const Buckets = require('buckets-js');
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
  it.only('highest speed array is succseively added new element and get median(higher complexity)', () => {
    //maintain max(store the lower half) heap & min heap(store the higher half)
    //when new element added,
    //Balanced(max&min heap same size),put it to max heap or min heap is okay,so here is always maxHeap
    //Unbalanced,put it to smaller size heap,
    let higherHalfMinHeap = new Buckets.Heap((a, b) => {
      return a - b;
    });
    let lowerHalfMaxHeap = new Buckets.Heap((a, b) => {
      return -(a - b);
    });
    function getMedian() {
      if (lowerHalfMaxHeap.size() == higherHalfMinHeap.size()) {
        return (lowerHalfMaxHeap.peek() + higherHalfMinHeap.peek()) / 2;
      } else {
        return lowerHalfMaxHeap.peek();
      }
    }
    function addNumberToHeaps(number) {
      //is even

      if (lowerHalfMaxHeap.size() == 0) {
        lowerHalfMaxHeap.add(number);
      } else if (lowerHalfMaxHeap.size() == higherHalfMinHeap.size()) {
        if (lowerHalfMaxHeap.peek() > number) {
          lowerHalfMaxHeap.add(number);
        } else {
          higherHalfMinHeap.add(number);
          //lower half max heap always bigger
          lowerHalfMaxHeap.add(higherHalfMinHeap.removeRoot());
        }
      } else if (lowerHalfMaxHeap.size() >= higherHalfMinHeap.size()) {
        if (lowerHalfMaxHeap.peek() < number) {
          higherHalfMinHeap.add(number);
        } else {
          lowerHalfMaxHeap.add(number);
          higherHalfMinHeap.add(lowerHalfMaxHeap.removeRoot());
        }
      } else {
        throw new Error('should not see this');
      }
    }

    function medianTracker(array) {
      for (let i = 0; i < array.length; i++) {
        addNumberToHeaps(array[i]);
        console.log(getMedian().toFixed(1));
      }
    }

    medianTracker([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    // addNumberToHeaps(1);
    // addNumberToHeaps(2);
    // addNumberToHeaps(3);
    // addNumberToHeaps(4);
    // addNumberToHeaps(5);
    // addNumberToHeaps(6);
    // addNumberToHeaps(7);
    // addNumberToHeaps(8);
    // addNumberToHeaps(9);
    // addNumberToHeaps(10);
    // expect(getMedian()).toBe(5.5);
  });
});
