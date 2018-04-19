let _ = require('lodash');
describe('array-native & lodash', () => {
  it('test set', () => {
    let mySet = new Set();

    mySet.add(1); // Set(1) {1}
    mySet.add(5); // Set(2) {1, 5}
    mySet.add(5); // Set { 1, 5 }
    mySet.add('some text'); // Set(3) {1, 5, "some text"}
    mySet.add('some text'); // Set(3) {1, 5, "some text
    var o = { a: 1, b: 2 };
    mySet.add(o);
    mySet.add(o);
    mySet.add(o);
    mySet.add(o);
    //remember javascript o don't have implement the equals() function as java
    //they use isEquals(a,b) to implement custom compare
    expect(mySet.size).toBe(4);
  });
});
