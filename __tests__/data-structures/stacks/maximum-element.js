describe('All', () => {
  it('All', () => {
    class StackNode {
      constructor(value, currentStackMax) {
        this.value = value;
        this.currentStackMax = currentStackMax;
      }
    }
    function processData(input) {
      //Enter your code here

      const inputs = input.split('\n');
      const numberOfQuery = Number(inputs[0]);
      const MIN_MAX = 0;
      let currentStackMax = MIN_MAX;
      let stack = [];
      for (let i = 1; i <= numberOfQuery; i++) {
        const query = inputs[i];
        const type = Number(query.split(' ')[0]);
        const value = Number(query.split(' ')[1]);

        switch (type) {
          case 1:
            //Math max is better then if else because it do type conversion to ensure it is number
            currentStackMax = Math.max(value, currentStackMax);

            stack.push(new StackNode(value, currentStackMax));
            break;
          case 2:
            let popNum = stack.pop();
            if (stack.length == 0) {
              currentStackMax = MIN_MAX;
            } else {
              currentStackMax = stack[stack.length - 1].currentStackMax;
            }

            break;
          case 3:
            console.log(stack[stack.length - 1].currentStackMax);
            break;
          default:
            console.log('unknown type', type);
        }
      }
    }
    processData(`10
1 97
2
1 20
2
1 26
1 20
2
3
1 91
3`);
  });
});
