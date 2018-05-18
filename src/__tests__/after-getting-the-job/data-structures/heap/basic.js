var buckets = require('buckets-js');
describe('All', () => {
  it('All', () => {
    //heap is just a tree with 2 child node for each node
    /*
    class HeapNode{
      HeapNode left;
      HeapNode right;
    }
    */
    //heap have 2 type,
    //min ,the root always is the min,max,the root always is the max
    /*
      we will use array to implement the class
https://www.youtube.com/watch?v=t0Cq6tVNRBA
    */
    // let minHeap = new buckets.Heap((a, b) => {
    //   return a - b;
    // });
    // minHeap.add(4);
    // minHeap.add(1);
    // minHeap.add(2);
    // minHeap.add(3);
    // expect(minHeap.peek()).toBe(1);
    //max heap
    let maxHeap = new buckets.Heap((a, b) => {
      return -(a - b);
    });
    maxHeap.add(1);

    maxHeap.add(3);
    maxHeap.add(5);
    maxHeap.add(7);
    maxHeap.add(9);
    console.log('arr', maxHeap.toArray());
    expect(maxHeap.peek()).toBe(9);
  });
});
