describe('All', () => {
  it('All', () => {
    function getMap(words) {
      var map = new Map();
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (map.has(word)) {
          const occurence = Number(map.get(word));
          map.set(word, occurence + 1);
        } else {
          map.set(word, 1);
        }
      }
      return map;
    }
    function isReplicable(baseMap, targetMap) {
      let replicable = true;
      for (let [word, occurence] of targetMap) {
        if (Number(occurence) > Number(baseMap.get(word))) {
          replicable = false;
        }
      }
      return replicable;
    }
    expect(
      isReplicable(
        getMap('two times three is not four'.split(' ')),
        getMap('two times two is four'.split(' '))
      )
    ).toBe(false);
  });
});
