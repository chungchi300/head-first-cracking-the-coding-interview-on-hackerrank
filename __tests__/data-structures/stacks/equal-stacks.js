process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = '';
var input_stdin_array = '';
var input_currentline = 0;
const _ = require('lodash');
process.stdin.on('data', function(data) {
  input_stdin += data;
});

process.stdin.on('end', function() {
  input_stdin_array = input_stdin.split('\n');
  main();
});

function readLine() {
  return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
function topestStack(indexedStacks) {
  return _.values(indexedStacks).reduce(
    (heightLabelStack, maximumHeightLabeledStack) => {
      if (maximumHeightLabeledStack.height > heightLabelStack.height) {
        return maximumHeightLabeledStack;
      } else {
        return heightLabelStack;
      }
    },
    { height: 0, stack: [] }
  );
}
function isAllStackSameHeight(indexedStacks) {
  let heights = _.values(indexedStacks).map(
    indexedStack => indexedStack.height
  );
  return heights.every(height => height == heights[0]);
}
function stackHeight(stack) {
  return stack.reduce((num, acc) => {
    return acc + num;
  }, 0);
}
function main() {
  var n1_temp = readLine().split(' ');
  var n1 = parseInt(n1_temp[0]);
  var n2 = parseInt(n1_temp[1]);
  var n3 = parseInt(n1_temp[2]);
  h1 = readLine().split(' ');
  h1 = h1.map(Number);
  h2 = readLine().split(' ');
  h2 = h2.map(Number);
  h3 = readLine().split(' ');
  h3 = h3.map(Number);
  const indexedStacks = {
    h1: {
      height: stackHeight(h1),
      stack: h1,
    },
    h2: {
      height: stackHeight(h2),
      stack: h2,
    },
    h3: {
      height: stackHeight(h3),
      stack: h3,
    },
  };

  while (isAllStackSameHeight(indexedStacks) == false) {
    const newTopestStack = topestStack(indexedStacks);
    const popedElementHeight = newTopestStack.stack.shift();
    newTopestStack.height -= popedElementHeight;
  }
  console.log(topestStack(indexedStacks).height);
}
