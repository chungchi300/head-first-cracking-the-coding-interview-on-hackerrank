describe("All", () => {
  it("Object mimck", () => {
    class Stack {
      constructor() {
        this._storage = {};
        this._length = 0;
      }
      push(val) {
        this._storage[this._length] = val;
        this._length++;
      }
      throwIfEmptyStack() {
        if (this._length == 0) {
          throw new Error("Empty Stack");
        }
      }
      pop() {
        this.throwIfEmptyStack();
        let val = this.peek();
        delete this._storage[this._length - 1];
        this._length--;
        return val;
      }
      peek() {
        this.throwIfEmptyStack();

        return this._storage[this._length - 1];
      }
    }

    let stack = new Stack();
    expect(() => {
      stack.peek();
    }).toThrow();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.peek()).toBe(3);
    expect(stack.peek()).toBe(3);
    expect(stack.peek()).toBe(3);
    expect(stack.pop()).toBe(3);
    expect(stack.peek()).toBe(2);
  });
});
