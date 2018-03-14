const _ = require('lodash');
/*
Learning Point -  Depth First Search algorithm
1. Recursive function(Definition & searching point)
2. When Searching,mutate the data to consume used data in order to let another search use proper data
*/
function getMatrixConnectedSumAtSpecificPosition(matrix, row, col) {
  //Stop point of recursive search - Use Boundary
  if (
    row < 0 ||
    row >= matrix.length ||
    col < 0 ||
    col > matrix[0].length ||
    matrix == null ||
    matrix[row][col] == 0
  ) {
    return 0;
  }
  matrix[row][col] = 0;
  let size = 1;
  //searching
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (!(r == row && c == col)) {
        size += getMatrixConnectedSumAtSpecificPosition(matrix, r, c);
      }
    }
  }

  return size;
}
function getLargestConnected(matrix) {
  let max = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      if (matrix[row][col] == 1) {
        let size = getMatrixConnectedSumAtSpecificPosition(matrix, row, col);
        max = Math.max(max, size);
      }
    }
  }
  return max;
}
describe('All - DFS Depth First Search', () => {
  it('get connectedMatrix sum', () => {
    expect(2 + 2).toBe(4);
    let matrix = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 0, 0]];
    expect(getLargestConnected(matrix)).toBe(5);
  });
});
