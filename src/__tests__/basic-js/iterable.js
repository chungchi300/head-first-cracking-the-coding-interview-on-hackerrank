describe("basic", () => {
  it("for ", () => {
    let arr = [1, 2, 3, 4];
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    expect(sum).toBe(10);
  });
  it("for of array", () => {
    let arr = [1, 2, 3, 4];
    let sum = 0;
    for (let num of arr) {
      sum += num;
    }

    expect(sum).toBe(10);
  });

  it("array foreach", () => {
    let arr = [1, 2, 3, 4];
    let sum = 0;
    arr.forEach((num, index) => {
      sum += num;
    });
    expect(sum).toBe(10);
  });
  it("for in object", () => {
    const me_obj = {
      name: "Doomed1993",
      activity: "Sleeping"
    };
    let result = [];
    for (let property in me_obj) {
      result.push(property);
    }
    expect(result).toEqual(["name", "activity"]);
  });
  it("for in array,proven again array is reference values with Object prototype", () => {
    let arr = [1, 2, 3, 4];
    let indexes = [];
    for (let num in arr) {
      indexes.push(num);
    }

    expect(indexes).toEqual(["0", "1", "2", "3"]);
  });
  it("recursively transform field to new object", () => {
    let floatBoundRect = {
      x: 122.33,
      y: 1233.33,
      width: 300.33,
      height: 30.33
    };
    let roundBoundRect = {};
    for (let property in floatBoundRect) {
      roundBoundRect[property] = Math.round(floatBoundRect[property]);
    }
    expect(roundBoundRect).toEqual({ x: 122, y: 1233, width: 300, height: 30 });
  });
});
