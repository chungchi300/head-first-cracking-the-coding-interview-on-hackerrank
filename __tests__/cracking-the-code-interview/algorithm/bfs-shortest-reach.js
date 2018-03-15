/*
2 // two node
4 2 //it have 4 nodes(1,2,3,4) ,and two edge
1 2 // road from 1-2 (edge No.1)
1 3 //road from 1-3 (edge No.2)
1 // start at 1

Print every shortest distance from
1 to every node,
4,2,3
-1,6,6(-1 mean not existed,6 mean existed)


3 1 // it have 3 nodes(1,2,3),and 1 edge
2 3 // road from 2-3(edge No.1)
2 // start at 2
Print every shortest distance from
2 to every node,
1,3
-1,6(-1 mean not existed,6 mean existed)
*/
class Node {
  constructor() {
    this.value;
    this.nearBy = [];
  }
  addRoad(nearByPoint) {
    if (!this.nearBy.find(nearByPoint)) {
      this.nearBy.add(nearByPoint);
    }
  }
}

describe('All - BFS node', () => {
  it('get BFS', () => {});
});
