describe("All", () => {
  it("", () => {
    //NOTE: it is a **hash map** ,instead of simple map!
    //use array to mimck our normal array
    class HashMap {
      constructor(value) {
        this._storage = [];
        this._tableSize = value;
      }
      insert(key, value) {
        //example of using specific hashing algorithm
        const tableValue = this._hash(key, this._tableSize);
        console.log({ tableValue });
        if (!this._storage[tableValue]) {
          this._storage[tableValue] = [];
        }
        //[0,0,0,[]]
        //TODO: Look for update the key, if it is existed, update it
        this._storage[tableValue].push([key, value]);
        //NOTE: Collision happen!
        //[0,0,0,[['a',1],['b',2]]
      }

      remove() {}
      retrieve(key) {
        const index = this._hash(key, this._tableSize);
        let sameKeyRelatedItems = this._storage[index];
        for (let sameKeyRelatedItem of sameKeyRelatedItems) {
          if (sameKeyRelatedItem[0] == key) {
            return sameKeyRelatedItem;
          }
        }
      }
      _hash(str, n) {
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
          sum += str.charCodeAt(i) * 3;
        }
        return sum % n;
      }
    }
    let myHT = new HashMap(25);
    console.log(myHT);
    myHT.insert("a", 1);
    myHT.insert("b", 1);
    console.log(myHT);
  });
});
