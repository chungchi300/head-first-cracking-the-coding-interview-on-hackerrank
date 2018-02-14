describe('All', () => {
  it('All', () => {
    /////////////// ignore above this line ////////////////////
    function isPrime(number) {
      if (1 >= number) {
        return false;
      }
      //the try ended in n/2 because the smallest division fully division is 2
      for (let i = 2; i * i <= number; ++i) {
        if (number % i == 0) {
          //if can fully divided by number that is lower then itself then ok
          return false;
        }
      }

      return true;
    }

    expect(isPrime(9)).toBe(false);
    expect(isPrime(11)).toBe(true);
  });
});
