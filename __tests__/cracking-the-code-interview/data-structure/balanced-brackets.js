class Stack {
  constructor() {
    this.elements = [];
  }
  push(element) {
    this.elements.push(element);
  }
  pop(element) {
    return this.elements.pop(element);
  }
  peek() {
    return this.elements[this.elements.length - 1];
  }
  isEmpty() {
    return this.elements.length == 0 ? true : false;
  }
}
function isBalanced(previousChar, currentChar) {
  if (previousChar == '{' && currentChar == '}') {
    return true;
  }
  if (previousChar == '[' && currentChar == ']') {
    return true;
  }
  if (previousChar == '(' && currentChar == ')') {
    return true;
  }

  return false;
}
function isExpressionBalanced(expression) {
  const stack = new Stack();
  const chars = expression.split('');

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] == '{' || chars[i] == '[' || chars[i] == '(') {
      stack.push(chars[i]);
    } else {
      let previousChar = stack.pop();

      if (!isBalanced(previousChar, chars[i])) {
        return false;
      }
    }
  }
  //still have unmatched element in stack element
  if (!stack.isEmpty()) {
    return false;
  }
  return true;
}
describe('All', () => {
  it('All', () => {
    expect(
      isExpressionBalanced(
        '(])[{{{][)[)])(]){(}))[{(})][[{)(}){[(]})[[{}(])}({)(}[[()}{}}]{}{}}()}{({}](]{{[}}(([{]'
      )
    ).toBe(false);
    expect(
      isExpressionBalanced(
        '[()][{}()][](){}([{}(())([[{}]])][])[]([][])(){}{{}{[](){}}}()[]({})[{}{{}([{}][])}]'
      )
    ).toBe(true);
    expect(isExpressionBalanced('{{}(')).toBe(false);
  });
});
