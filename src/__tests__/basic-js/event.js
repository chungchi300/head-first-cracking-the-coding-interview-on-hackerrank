const EventEmitter = require("events");

describe("extra", () => {
  it("event", () => {
    class MyEventEmitter extends EventEmitter {}
    let call = 0;
    const myEmitter = new MyEventEmitter();
    myEmitter.on("event", () => {
      call++;
      expect(call).toBe(1);
    });

    myEmitter.on("event", () => {
      call++;
      expect(call).toBe(2);
    });
    //synchronous here, but in real world, it will be async and call by other
    myEmitter.emit("event");
    expect(call).toBe(2);
  });
});
