describe('All', () => {
  it('All', () => {
    //Data structure [0=>0...26=>0]
    function createLetterCounts() {
      let letterCounts = [];
      for (let i = 0; i < 26; i++) {
        letterCounts[i] = 0;
      }
      return letterCounts;
    }
    function diff(aChars, bChars) {
      let letterCounts = createLetterCounts();
      for (let i = 0; i < aChars.length; i++) {
        const charCode = aChars[i].charCodeAt(0) - 'a'.charCodeAt(0);
        letterCounts[charCode] = ++letterCounts[charCode];
      }
      for (let i = 0; i < bChars.length; i++) {
        const charCode = bChars[i].charCodeAt(0) - 'a'.charCodeAt(0);
        //if letter occur in aChars,it will be neutrialized,if not existed,it will become minus
        letterCounts[charCode] = --letterCounts[charCode];
      }
      let totalDiff = 0;
      for (let i = 0; i < letterCounts.length; i++) {
        totalDiff += Math.abs(letterCounts[i]);
      }
      return totalDiff;
    }
    expect(diff('cde', 'abc')).toBe(4);
  });
});
