class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}
function createSampleList() {
  let clockNodes = [];
  for (let i = 0; i < 60; i++) {
    let clockNode = new Node(i);
    clockNodes[i] = clockNode;
  }
  for (let i = 0; i < 60; i++) {
    if (i == 59) {
      clockNodes[i].next = clockNodes[0];
      break;
    }
    clockNodes[i].next = clockNodes[i + 1];
  }
  const cNode = new Node("c", clockNodes[0]);
  const bNode = new Node("b", cNode);

  const aNode = new Node("a", bNode);
  return aNode;
}
describe("All", () => {
  it("All", () => {
    /**
    Metaphor,it is like clock,with 1 sec(slow) ,2 sec(fast),
slow    1   2   3   4
fast    2   4   6   8
diff    59  58  57  56
   The distance always reduce 1
   The dynamic algorithm mainly want to enter the clock,for example,it help the node enter 1-60 cycle from a  - c  in following example
   a,b,c, 1,2,3,4,5...60(and it point to 1)
    **/
    function hasCycle(node) {
      if (node === null || node.next === null) {
        return false;
      }
      let slow = node;
      let fast = node.next;
      while (slow !== fast) {
        if (fast === null || fast.next === null) return false;
        slow = slow.next;
        fast = fast.next.next;
      }

      return true;
    }
    var nodeA = createSampleList();
    expect(hasCycle(nodeA)).toBe(true);
  });
});
