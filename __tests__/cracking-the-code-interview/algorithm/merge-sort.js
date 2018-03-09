class MergeSort {
  constructor() {
    this.swaps = 0;
  }
  sort(arr) {
    arr.sort((a, b) => a - b);
  }

  mergeSort(arr) {
    let helperArr = new Array(arr.length);
    helperArr.fill(0);
    this.mergeSortReal(arr, helperArr, 0, arr.length - 1);
    return this.swaps;
  }

  mergeSortReal(arr, helperArr, start, end) {
    // console.log('merge sort', arr, helperArr, start, end);
    if (start < end) {
      let mid = parseInt((start + end) / 2);
      /* basic knowledge->spliting arr don't cost calculator power,
      its just a memory operation

      Also learn a skilled that stored manys small arrs in 1 arr
      Small arr = arr+two position->start,end
      */
      /*
      the recursion will end eventually
      ,the result will be stored at arr
      */
      /*
        divide to arr that contains 1 element that
        simplified the algorithm
        arr with one element is already sorted


        the bottom sort operation is n/2,each element compare with the next element

      */
      this.mergeSortReal(arr, helperArr, start, mid);
      this.mergeSortReal(arr, helperArr, mid + 1, end);
      //merge start at bottom,it have 2 small arr,(start mid) + (mid + end)
      this.merge(arr, helperArr, start, mid, end);
    }
  }

  //bottom sort of two sorted arr
  merge(arr, helperArr, start, mid, end) {
    for (let i = start; i <= end; i++) {
      // notice "i" goes from "start" to "end", not "0" to "arr.length"
      //helperArr is a clone of sum of two small arr,
      //in order to retrieve original data
      helperArr[i] = arr[i];
    }

    let curr = start;
    //left start position is start
    let left = start;
    //right start position is right
    let right = mid + 1;

    /* Loop through helper[] left and right halves
    and continuously copy smaller element to arr[]

    belows is the algorithm that always consume one smaller arr,
    it is way smarter then the one I think(and used in mergeTwoOrderedAscendingArray) always consume left first,
    since because the left arr may be bigger array,

     */
    /*
      quite if,remember both case are possible
      * left > mid,utilize all left halve
      * right > end,,utilize all right halve
    */
    while (left <= mid && right <= end) {
      if (helperArr[left] <= helperArr[right]) {
        //it is same as arr.push&&shifing from right halve
        arr[curr++] = helperArr[left++];
      } else {
        /*
         Each time we choose element from right side,
         we count up how many elements
         it is less than from left side.=>
         (right element position swap(each swap can only move 1))
         because adding from right & and distance it the swaps number it need
         e.g
         [1,2,3] , [1,3,4]
         the right 1 need (2+1) swaps to the step
         This is equivalent to counting swaps.
          */
        this.swaps += mid + 1 - left;
        //it is same as arr.push&&shifing from right halve
        arr[curr++] = helperArr[right++];
      }
    }

    /*
    Copy remaining elements of left half
    when left halve still have element
    =>right > end, left still have remainings(that is all bigger),so added arr
    Right half elements are already in proper place

     */
    while (left <= mid) {
      arr[curr++] = helperArr[left++];
    }

    /*hidden skip
    /*
    Copy remaining elements of left half
    when left halve still have element
    =>left > mid, right still have remainings(that is all bigger)
    //the adding of right is unnecessary because
    it is already in the arr & it is sorted!!


    while (right <= end) {
      arr[curr++] = helperArr[right++];
    }
     */
  }

  /*The reason why merged two ordered ascending arr is so effective is
   because one number can compare a group of number(*another ascending arr),
   **1 number compared by group** if the common factor for effective sorting algorithm
   */
  mergeTwoOrderedAscendingArray(arr, begin, mid, end) {
    // begin to mid is left arr,mid to end is right arr
    let ascendingResult = [];
    let leftArr = arr.slice(begin, mid);
    let rightArr = arr.slice(mid, end + 1);
    // console.log('leftArr', leftArr);
    // console.log('rightArr', rightArr);
    let lettElementLength = mid - begin - 1;
    // console.log('lettElementLength', lettElementLength);
    while (leftArr.length > 0) {
      if (leftArr[0] > rightArr[0]) {
        let pushingElement = rightArr.shift();
        // console.log('pushing right', pushingElement);
        ascendingResult.push(pushingElement);
      } else {
        let pushingElement = leftArr.shift();
        // console.log('pushing left', pushingElement);

        ascendingResult.push(pushingElement);
      }
    }
    // console.log(
    //   'ascendingResult',
    //   ascendingResult,
    //   rightArr,
    //   ascendingResult.concat(rightArr)
    // );
    return ascendingResult.concat(rightArr);
  }
}
describe('All', () => {
  // it('Full question', () => {
  //   let arr = [3, 2, 1];
  //   let ms = new MergeSort();
  //   ms.sort(arr);
  //   expect(ms.swaps).toBe(3);
  //   expect(arr).toEqual([1, 2, 3]);
  // });
  it('mergeTwoOrderedAscendingArray', () => {
    let arr = [2, 4, 6, 9, 4, 8, 10, 14];
    let ms = new MergeSort();
    expect(ms.mergeTwoOrderedAscendingArray(arr, 0, 4, 7)).toEqual([
      2,
      4,
      4,
      6,
      8,
      9,
      10,
      14,
    ]);
    // expect(ms.swaps).toBe(3);
  });
  it('mergeSort', () => {
    let arr = [6, 8, 2, 4];
    let ms = new MergeSort();
    ms.mergeSort(arr);
    expect(arr).toEqual([2, 4, 6, 8]);
    expect(ms.swaps).toBe(4);
  });
  // it('moveBiggestElementToEndBySwap on first element', () => {
  //   let a = [3, 2, 1];
  //   let swapOperation = 0;
  //   swapOperation += moveBiggestElementToEndBySwap(a, 0);
  //
  //   expect(swapOperation).toBe(2);
  //   expect(a).toEqual([2, 1, 3]);
  // });
});
