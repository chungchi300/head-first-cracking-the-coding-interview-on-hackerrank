describe('All', () => {
  it('All', () => {
    /* Hidden stub code will pass a root argument to the function below. Complete the function to solve the challenge. Hint: you may want to write one or more helper functions.

  The Node class is defined as follows:

  */
    class Node {
      constructor(data) {
        this.data = data;
        this.left = left;
        this.right = right;
      }
    }
    var correctBinaryTree = {
      data: 4,
      left: {
        data: 2,
        left: {
          data: 1,
          left: null,
          right: null,
        },
        right: {
          data: 3,
          left: null,
          right: null,
        },
      },
      right: {
        data: 6,
        left: {
          data: 5,
          left: null,
          right: null,
        },
        right: {
          data: 7,
          left: null,
          right: null,
        },
      },
    };
    var wrongBinaryTree = {
      data: 4,
      left: {
        data: 2,
        left: {
          data: 1,
          left: null,
          right: null,
        },
        right: {
          //secretly bigger then ancestor
          data: 6,
          left: null,
          right: null,
        },
      },
      right: {
        data: 6,
        left: {
          data: 5,
          left: null,
          right: null,
        },
        right: {
          data: 7,
          left: null,
          right: null,
        },
      },
    };
    function isBinaryBST(node, min, max) {
      if (node == null) {
        return true;
      }
      if (node.data <= min) {
        return false;
      }
      if (node.data >= max) {
        return false;
      }
      return (
        isBinaryBST(node.left, min, node.data) &&
        isBinaryBST(node.right, node.data, max)
      );
    }
    function checkBST(node) {
      return isBinaryBST(node, Math.min(), Math.max());
    }
    expect(isBinaryBST(correctBinaryTree)).toBe(true);
    expect(isBinaryBST(wrongBinaryTree)).toBe(false);
  });
});
