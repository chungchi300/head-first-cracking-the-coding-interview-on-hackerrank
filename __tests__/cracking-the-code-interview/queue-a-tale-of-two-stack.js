describe('All', () => {
  it('All', () => {
    class Queue {
      constructor() {
        this.elements = [];
      }
      queue(element) {
        this.elements.push(element);
      }
      dequeue(element) {
        this.elements.shift(element);
      }
      peek() {
        return this.elements[0];
      }
    }
    function processData(input) {
      //Enter your code here

      const inputs = input.split('\n');
      const outputs = [];
      const numberOfQuery = Number(inputs[0]);
      let queue = new Queue();
      for (let i = 1; i <= numberOfQuery; i++) {
        const query = inputs[i];
        const type = Number(query.split(' ')[0]);
        const value = Number(query.split(' ')[1]);
        switch (type) {
          case 1:
            queue.queue(value);
            break;

          case 2:
            queue.dequeue(value);
            break;
          case 3:
            outputs.push(queue.peek());

            break;
        }
      }
      return outputs;
    }
    expect(
      processData(`10
1 42
2
1 14
3
1 28
3
1 60
1 78
2
2`)
    ).toEqual([14, 14]);
    //Equal  is deep compare
    //toBe is shallow compare for object
  });
});
