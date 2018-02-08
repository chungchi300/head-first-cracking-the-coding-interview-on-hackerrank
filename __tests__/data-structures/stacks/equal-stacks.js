const _ = require('lodash');

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
function popToEven(indexedStacks) {
  while (isAllStackSameHeight(indexedStacks) == false) {
    const newTopestStack = topestStack(indexedStacks);
    const popedElementHeight = newTopestStack.stack.shift();
    newTopestStack.height -= popedElementHeight;
  }
  return indexedStacks;
}
describe('All', () => {
  const h1 = [3, 2, 1, 1, 1];
  const h2 = [4, 3, 2];
  const h3 = [1, 1, 4, 1];
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
  it('topest', () => {
    expect(topestStack(indexedStacks)).toBe(indexedStacks.h2);
  });
  it('All', () => {
    popToEven(indexedStacks);
    expect(topestStack(indexedStacks).height).toBe(5);
  });
});
