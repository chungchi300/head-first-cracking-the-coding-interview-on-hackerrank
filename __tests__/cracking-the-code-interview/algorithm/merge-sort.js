class MergeSort {
  constructor() {
    this.swaps = 3;
  }
  sort(arr) {
    arr.sort((a, b) => a - b);
  }
  mergeTwoOrderedAscendingArray(arr, begin, mid, end) {
    // begin to mid is left array,mid to end is right array
    let ascendingResult = [];
    let leftArr = arr.slice(begin, mid);
    let rightArr = arr.slice(mid, end + 1);
    console.log('leftArr', leftArr);
    console.log('rightArr', rightArr);
    let lettElementLength = mid - begin - 1;
    console.log('lettElementLength', lettElementLength);
    while (leftArr.length > 0) {
      if (leftArr[0] > rightArr[0]) {
        let pushingElement = rightArr.shift();
        console.log('pushing right', pushingElement);
        ascendingResult.push(pushingElement);
      } else {
        let pushingElement = leftArr.shift();
        console.log('pushing left', pushingElement);

        ascendingResult.push(pushingElement);
      }
    }
    console.log(
      'ascendingResult',
      ascendingResult,
      rightArr,
      ascendingResult.concat(rightArr)
    );
    return ascendingResult.concat(rightArr);
  }
}
describe('All', () => {
  it('Full question', () => {
    let arr = [3, 2, 1];
    let ms = new MergeSort();
    ms.sort(arr);
    expect(ms.swaps).toBe(3);
    expect(arr).toEqual([1, 2, 3]);
  });
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
    expect(ms.swaps).toBe(3);
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
