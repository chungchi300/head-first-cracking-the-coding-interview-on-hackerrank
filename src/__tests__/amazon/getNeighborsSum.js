// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED

let _ = require("lodash");
//high function
//global
const FROM_DEAD_TO_LIFE = 0.5;
//Math.ceil(0.5=>1)
const FROM_LIFT_TO_DEAD = -0.5;
//Math.ceil(-0.5=>0)
describe("array-native & lodash", () => {
  it("allRGBA", () => {
    var retrieveVal = function(val) {
      //0.5 => 0, -0.5 => 1
      //0=>0, 1=>1
      if (val == FROM_LIFT_TO_DEAD) {
        return 1;
      }
      if (val == FROM_DEAD_TO_LIFE) {
        return 0;
      }
      return val;
    };

    var getPositionScore = function(position, states) {
      let leftCellState = states[position - 1];
      let rightCellState = states[position + 1];
      if (leftCellState == undefined) {
        leftCellState = 0;
      }
      if (rightCellState == undefined) {
        rightCellState = 0;
      }

      let sum = retrieveVal(leftCellState) + retrieveVal(rightCellState);
      console.log({ position, sum, leftCellState, rightCellState });
      return sum;
    };

    function cellCompete(states, days) {
      // WRITE YOUR CODE HERE
      //simple version of life of game
      for (let i = 0; i < states.length; i++) {
        let sum = getPositionScore(i, states);
        if (states[i]) {
          if (sum == 0 || sum == 2) {
            console.log("from dead to life");
            states[i] = FROM_LIFT_TO_DEAD;
          }
        } else {
          if (sum == 1) {
            console.log("from  life to dead");
            states[i] = FROM_DEAD_TO_LIFE;
          }
        }
      }
      console.log(states);
      for (let i = 0; i < states.length; i++) {
        states[i] = Math.abs(Math.ceil(states[i]));
      }
      return states;
    }
    expect(cellCompete([1, 0, 0, 0, 0, 1, 0, 0], 1)).toEqual([
      0,
      1,
      0,
      0,
      1,
      0,
      1,
      0
    ]);
    // FUNCTION SIGNATURE ENDS
  });
});
