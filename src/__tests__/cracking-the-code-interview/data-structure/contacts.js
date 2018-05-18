class TrieNode {
  constructor(words) {
    //store children(a character) in a map
    this.children = {};
    this.size = 0;
  }
  putChildIfAbsent(ch) {
    if (this.children[ch] == undefined) {
      this.children[ch] = new TrieNode();
    }
  }

  getChild(ch) {
    return this.children[ch];
  }
}

class Trie {
  constructor(words = []) {
    this.root = new TrieNode();
    words.forEach(word => this.add(word));
  }

  insert(str) {
    let curr = this.root;

    for (let i = 0; i < str.length; i++) {
      let ch = str.charAt(i);
      curr.putChildIfAbsent(ch);
      curr = curr.getChild(ch);
      curr.size++;
    }
  }
  //not good at find ''
  find(prefix) {
    let curr = this.root;

    /* Traverse down tree to end of our prefix */
    for (let i = 0; i < prefix.length; i++) {
      let ch = prefix.charAt(i);
      curr = curr.getChild(ch);
      if (curr == null) {
        return 0;
      }
    }
    return curr.size;
  }
}

describe('All', () => {
  it('All', () => {
    // insert few values
    var trie = new Trie();
    trie.insert('hack');
    trie.insert('hackerrank');

    expect(trie.find('hac')).toEqual(2);

    expect(trie.find('hak')).toEqual(0);
  });
});
