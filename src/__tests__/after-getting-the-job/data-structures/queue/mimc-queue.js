describe("All", () => {
  it("Array queue", () => {
    class Queue {
      constructor() {
        this._storage = {};
        this._length = 0;
        this._headIndex = 0;
      }
      enqueue(val) {
        //NOTE: that looks from different algorithm, but in fact all enqueue algorithm is startingIndex(0 if always shuffle, but we don't shuffle here) + this.length

        const lastAvailableIndexForInsertion = this._length + this._headIndex;
        this._storage[lastAvailableIndexForInsertion] = val;
        this._length++;
        // this._headIndex++;
      }
      throwIfEmpty() {
        if (this._length == 0) {
          throw new Error("Empty Stack");
        }
      }
      dequeue() {
        this.throwIfEmpty();
        //O(n)
        let val = this.peek();
        delete this._storage[this._headIndex];
        //NOTE: the head index not only the current point, also act as starting point for proper enqueue position
        //NOTE: the pretty of LOG(1) of dequeue
        this._headIndex++;
        this._length--;
        return val;
      }
      peek() {
        this.throwIfEmpty();

        return this._storage[this._headIndex];
      }
    }

    let queue = new Queue();
    expect(() => {
      queue.peek();
    }).toThrow();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue).toEqual({
      _storage: { "0": 1, "1": 2, "2": 3 },
      _length: 3,
      _headIndex: 0
    });
    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue).toEqual({
      _storage: { "1": 2, "2": 3 },
      _length: 2,
      _headIndex: 1
    });
    expect(queue.peek()).toBe(2);
    queue.enqueue(4);

    expect(queue).toEqual({
      _storage: { "1": 2, "2": 3, "3": 4 },
      _length: 3,
      _headIndex: 1
    });
  });
});
