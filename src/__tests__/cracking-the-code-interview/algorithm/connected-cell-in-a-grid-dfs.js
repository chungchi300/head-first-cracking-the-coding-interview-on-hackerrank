const _ = require('lodash');
/*
Learning Point -  Depth First Search algorithm
1. Recursive function(Definition & searching point)
2. When Searching,mutate the data to consume used data in order to let another search use proper data.

3. native function call stack size is 17964
4. is over it->the solution are
   * implement your stack ->trampolines

   V8设置内存限制是由理由的，每个进程1.7G左右的内存足够作为服务进程来使用。如果超过这个限制首先考虑的是内存泄露，其次是超过单实例能力，最后实在没辙再从node启动项调整进程的可用最大内存。如果前两部没有做完直接修改只能是治标不治本。
BTW： node app.js --max-stack-size 最大内存
*/
function getMatrixConnectedSumAtSpecificPosition(matrix, x, y) {
  //Stop point of recursive search - Use Boundary
  if (
    x < 0 ||
    x >= matrix.length ||
    y < 0 ||
    y >= matrix[0].length ||
    matrix == null ||
    matrix[x][y] == 0
  ) {
    return 0;
  }
  //switch to 0 so it would come back when travse
  matrix[x][y] = 0;
  let size = 1;
  /*
  searching p = first looking point,c current point
  p1 p4 p6
  p2 c  p7
  p3 p5 p8

  1 1 1  will it things that want to look back? no
  1 1 0
  0 1 1

  1 1 1 because already counted and existed stack to follow them (Connected in size + stack) focus on the bottom row
  1 0 0 value 1 => 1 1 1
  0 1 1            1 0 0
                   0 1 1


  imagination the stack=>every time recursive function turn itself to zero,
  it already have function stack to search other direction staff                 
  */
  for (let nextTraverseX = x - 1; nextTraverseX <= x + 1; nextTraverseX++) {
    for (let nextTraverseY = y - 1; nextTraverseY <= y + 1; nextTraverseY++) {
      //skip current,already counted
      if (!(nextTraverseX == x && nextTraverseY == y)) {
        // console.log(r, x, matrix.length, matrix.length, c, y);

        size += getMatrixConnectedSumAtSpecificPosition(
          matrix,
          nextTraverseX,
          nextTraverseY
        );
      }
    }
  }

  return size;
}
function getLargestConnected(matrix) {
  let max = 0;

  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      if (matrix[x][y] == 1) {
        let size = getMatrixConnectedSumAtSpecificPosition(matrix, x, y);

        max = Math.max(max, size);
      }
    }
  }
  return max;
}
describe('All - DFS Depth First Search', () => {
  it('get connectedMatrix sum', () => {
    expect(2 + 2).toBe(4);
    let matrix = [
      [0, 0, 1, 1],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
    ];
    expect(getLargestConnected(matrix)).toBe(8);
  });
});
