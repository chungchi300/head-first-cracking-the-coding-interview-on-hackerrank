describe("closure", () => {
  it("test-closure", () => {
    function makeAdder(baseNum) {
      return function(numBeingAdded) {
        return baseNum + numBeingAdded;
      };
    }

    var add5er = makeAdder(5);
    var add20er = makeAdder(20); // ?
    //add5er and add20er are closure,they remember the scope of 5&10 for its a
    expect(11).toBe(add5er(6));
    //no people can run time change the adder of add 20
    expect(27).toBe(add20er(7));
    expect(27).toBe(add20er(7));
    //OOP implementation
    class Adder {
      constructor(baseNum) {
        this.baseNum = baseNum;
      }
      execute(numBeingAdded) {
        return this.baseNum + numBeingAdded;
      }
    }

    var addO5er = new Adder(5);
    var addO20er = new Adder(20); // ?
    expect(11).toBe(addO5er.execute(6));
    //the adder base num is accessable via addO5er .And still run time changable.(lower the readability)
    expect(27).toBe(addO20er.execute(7));
    expect(27).toBe(addO20er.execute(7));
  });
  it("test-o", () => {
    function O(a, b) {
      this.a = a;
      this.b = b;
    }
    O.prototype.b = 3;
    O.prototype.c = 4;

    let o = new O(1, 2);

    let o2 = new O(10, 20);

    expect(1).toBe(o.a);
    //
    expect(2).toBe(o.b);

    expect(4).toBe(o.c);
    O.prototype.c = 16;
    expect(10).toBe(o2.a);
    //
    expect(20).toBe(o2.b);
    //using same type of memory of prototype
    expect(16).toBe(o2.c);
    expect(16).toBe(o.c);
  });
  it("test-weird", () => {
    var o = {
      a: 2,
      m: function() {
        return this.a + 1;
      }
    };
    expect(3).toBe(o.m());
    // console.log(o.m()); // 3  t.is(3,o.m());

    // 当调用 o.m 时,'this'指向了o.

    var p = Object.create(o);
    // p is a object with prototype o.
    expect(2).toBe(p.a);

    p.a = 12; // 创建 p 的自身属性a.
    expect(13).toBe(p.m());
  });
});
