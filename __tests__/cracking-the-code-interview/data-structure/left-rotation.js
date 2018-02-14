describe('All', () => {
  it('All', () => {
    /////////////// ignore above this line ////////////////////
    function leftRotate(arr, operation) {
      let newArr = arr.slice(0);
      for (let i = 0; i < operation; i++) {
        let firstElement = newArr.shift();
        newArr.push(firstElement);
      }
      return newArr;
    }

    expect(leftRotate([1, 2, 3, 4, 5], 4).join('')).toBe(
      [5, 1, 2, 3, 4].join('')
    );
  });
});
