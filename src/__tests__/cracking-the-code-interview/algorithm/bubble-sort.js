/////////////// ignore above this line ////////////////////
function moveBiggestElementToEndBySwap(a, i) {
  let swapOperation = 0;
  /*
    swapping distance is 0 to a.length-1-i because
    1. The last element don't swap,=>-1
    2. Element that already sorted don't need swapping,=>-i
    */
  for (let j = 0; j < a.length - 1 - i; j++) {
    if (a[j] > a[j + 1]) {
      let swap = a[j];

      a[j] = a[j + 1];
      a[j + 1] = swap;

      swapOperation++;
    }
  }
  return swapOperation;
}
describe('All', () => {
  it('Full question', () => {
    let a = [3, 2, 1];
    let swapOperation = 0;
    for (let i = 0; i < a.length - 1; i++) {
      swapOperation += moveBiggestElementToEndBySwap(a, i);
    }
    expect(swapOperation).toBe(3);
    expect(a).toEqual([1, 2, 3]);
  });
  it('moveBiggestElementToEndBySwap on first element', () => {
    let a = [3, 2, 1];
    let swapOperation = 0;
    swapOperation += moveBiggestElementToEndBySwap(a, 0);

    expect(swapOperation).toBe(2);
    expect(a).toEqual([2, 1, 3]);
  });
});
