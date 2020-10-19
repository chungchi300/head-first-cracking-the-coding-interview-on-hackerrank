var util = require("util");
describe("extra", () => {
  it("iterator", () => {
    let arr = [1, 2, 3];
    let iterator = arr[Symbol.iterator]();

    let result = [];
    let nextElement;
    while ((nextElement = iterator.next())) {
      if (nextElement.done) {
        break;
      }

      result.push(nextElement.value);
    }
    expect(arr).toEqual([1, 2, 3]);
  });
  it("iterator when adding work", () => {
    let arr = [1, 2, 3];
    let iterator = arr[Symbol.iterator]();

    let result = [];
    let nextElement;
    while ((nextElement = iterator.next())) {
      if (nextElement.done) {
        break;
      }
      if (nextElement.value == 1) {
        arr.splice(1, 0, "add");
      }
      result.push(nextElement.value);
    }
    expect(arr).toEqual([1, "add", 2, 3]);
  });

  it("separate iterator", () => {
    let arr = [1, 2, 3];
    let iterator = arr[Symbol.iterator]();
    let secondIterator = arr[Symbol.iterator]();
    expect(iterator.next().value).toBe(1);
    secondIterator.next();
    secondIterator.next();
    expect(secondIterator.next().value).toBe(3);
  });
  it("custom iterator - single mode", () => {
    class Counter {
      // Counter 的实例应该迭代limit 次
      constructor(limit) {
        this.count = 1;
        this.limit = limit;
      }
      next() {
        if (this.count <= this.limit) {
          return { done: false, value: this.count++ };
        } else {
          return { done: true, value: undefined };
        }
      }
      //declare the function
      [Symbol.iterator]() {
        return this;
      }
    }
    let arr = [];
    let counter = new Counter(3);
    for (let i of counter) {
      arr.push(i);
    }
    expect(arr).toEqual([1, 2, 3]);
  });
  it("production  iterator -> multiple instance, implemented by closure", () => {
    class Counter {
      constructor(limit) {
        this.limit = limit;
      }
      [Symbol.iterator]() {
        let count = 1,
          limit = this.limit;
        return {
          next() {
            if (count <= limit) {
              return { done: false, value: count++ };
            } else {
              return { done: true, value: undefined };
            }
          },
        };
      }
    }

    let counter = new Counter(3);
    let iterator1 = counter[Symbol.iterator]();
    let iterator2 = counter[Symbol.iterator]();
    iterator1.next();
    expect(iterator1.next()).toEqual({ done: false, value: 2 });

    expect(iterator2.next()).toEqual({ done: false, value: 1 });
  });
  it("iterator with exited", () => {
    class Counter {
      constructor(limit) {
        this.limit = limit;
      }
      [Symbol.iterator]() {
        let count = 1,
          limit = this.limit;
        return {
          next() {
            if (count <= limit) {
              return { done: false, value: count++ };
            } else {
              return { done: true };
            }
          },
          return() {
            console.log("Exiting early, handling in exception");
            return { done: true };
          },
        };
      }
    }
    // let counter1 = new Counter(5);
    // for (let i of counter1) {
    //   if (i > 2) {
    //     break;
    //   }
    //   console.log(i);
    // }

    // 1
    // 2
    // Exiting early
    let counter2 = new Counter(5);
    try {
      for (let i of counter2) {
        if (i > 2) {
          throw "err";
        }
        console.log(i);
      }
    } catch (ex) {}
  });
  it("make dragons", () => {
    function makeDragon() {
      return "dragon" + Math.random();
    }
    let dragonFactory = {
      [Symbol.iterator]() {
        return {
          next() {
            if (Math.random() > 0.75) {
              return { done: true };
            } else {
              return { done: false, value: makeDragon() };
            }
          },
          return() {
            console.log("Exiting early, handling in exception");
            return { done: true };
          },
        };
      },
    };
    let dragons = [];

    for (let dragon of dragonFactory) {
      dragons.push(dragon);
    }
    expect(dragons.length > 0).toBe(true);
  });
});
