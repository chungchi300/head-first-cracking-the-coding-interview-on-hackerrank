function getConnectedMatrixs() {
  return [[[1, 1, 0], [0, 1, 1], [0, 0, 1]], [[1]]];
}
function getMaxtrixSum() {
  return 5;
}
describe('All', () => {
  it('get connectedMatrixs', () => {
    expect(2 + 2).toBe(4);
    let matrix = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 0, 0]];
    let connectedMatrixs = getConnectedMatrixs(matrix);
    expect(connectedMatrixs.length).toBe(2);
    expect(connectedMatrixs[0]).toEqual([[1, 1, 0], [0, 1, 1], [0, 0, 1]]);
    expect(connectedMatrixs[1]).toEqual([[1]]);
  });
  it('get connectedMatrix sum', () => {
    expect(2 + 2).toBe(4);
    let matrix = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 0, 0]];
    let connectedMatrixs = getConnectedMatrixs(matrix);

    expect(getMaxtrixSum(connectedMatrixs[0])).toEqual(5);
  });
});
