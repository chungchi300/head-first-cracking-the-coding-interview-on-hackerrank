'use strict';

import _ from 'lodash';

describe('Basic', () => {
  it('test-statement', () => {
    const b = 4;
    var a;
    //a statement & execution
    a = b * 2;
    expect(a).toBe(8);
    //Program just are collection of statement
  });
  it('test-literal-value-expression,variable expression,arithmetic expression,assignment expression', () => {
    //assignment + literal
    const b = 4;
    //variable expression & declaration
    var a;
    //test-literal-value-expression,variable expression,arithmetic expression,assignment expression
    a = b * 2;
    expect(a).toBe(8);
    //Program just are collection of statement
  });
  it('test-executing program', () => {
    //JS compile the statement & execute immediately per line
    const b = 4;
    var a;
    //a statement & execution
    a = b * 2;
    expect(a).toBe(8);
    //Program just are collection of statement
  });
  it('test-operator', () => {
    //Left because too simple
  });
  it('test-condition', () => {
    //Left because too simple
  });
});
describe('Loop', () => {
  it('test-while-loops', () => {
    var numOfCustomers = 0;
    var numOfConsoleLog = 0;
    while (numOfCustomers > 0) {
      console.log('How may I help you?');

      // help the customer...
      numOfConsoleLog++;
      numOfCustomers = numOfCustomers - 1;
    }
    expect(numOfConsoleLog).toBe(0);
  });
  it('test-do-while-loops', () => {
    var numOfCustomers = 0;
    var numOfConsoleLog = 0;
    //Always execute once
    do {
      console.log('How may I help you?');

      // help the customer...
      numOfConsoleLog++;
      numOfCustomers = numOfCustomers - 1;
    } while (numOfCustomers > 0);

    expect(numOfConsoleLog).toBe(1);
  });
  it('test-break-statement-break-a-loop', () => {
    var i = 0;
    var numOfConsoleLog = 0;
    // a `while..true` loop would run forever, right?
    while (true) {
      // stop the loop?
      if (i <= 9 === false) {
        break;
      }
      numOfConsoleLog++;
      console.log(i);
      i = i + 1;
    }
    expect(numOfConsoleLog).toBe(10);
  });
  it('test-break-statement-break-a-for-loop', () => {
    var numOfConsoleLog = 0;
    for (var i = 0; i <= 9; i = i + 1) {
      if (i <= 4 === false) {
        break;
      }
      numOfConsoleLog++;
      console.log(i);
    }
    expect(numOfConsoleLog).toBe(5);
  });
});

describe('Function&Scope', () => {
  //function is just section of code,which is declared before and executable
  it('test-function', () => {
    function printAmount() {
      return amount.toFixed(2);
    }
    //amount exist in window scope,so that the printAmount function can access it
    var amount = 99.99;

    expect(printAmount()).toBe('99.99'); // "99.99"

    amount = amount * 2;

    expect(printAmount()).toBe('199.98'); // "199.98"
  });
  it('test-scope,AKA lexical scope', () => {
    function one() {
      // this `a` only belongs to the `one()` function,scope belongs to function
      var a = 1;
      return a;
    }

    function two() {
      // this `a` only belongs to the `two()` function,scope belongs to function
      var a = 2;
      return a;
    }

    expect(one()).toBe(1); // 1
    expect(two()).toBe(2); // 2
  });
  it('test-scope-var', () => {
    function outer() {
      var a = 1;

      function inner() {
        var b = 2;

        // we can access both `a` and `b` here

        return a + b;
      }

      expect(inner()).toBe(3);

      // we can only access `a` here
      expect(a).toBe(1);
    }
    outer();
  });
  it('test-scope-double-declare-var', () => {
    function outer() {
      var a = 1;
      var a = 3;
      function inner() {
        var b = 2;

        // we can access both `a` and `b` here

        return a + b;
      }

      expect(inner()).toBe(5);

      // we can only access `a` here
      expect(a).toBe(3);
    }
    outer();
  });
  it('test-scope-finding,the-closest-win', () => {
    function outer() {
      var a = 1;

      function inner() {
        var b = 2;

        // we can access both `a` and `b` here
        var a = 3;
        return a + b;
      }

      expect(inner()).toBe(5);

      // we can only access `a` here
      expect(a).toBe(1);
    }
    outer();
  });
  it('test-scope-var-to-double-verify-function-is-just-section-of-code', () => {
    function outer() {
      function inner() {
        var b = 2;

        // we can access both `a` and `b` here

        return a + b;
      }

      expect(_.isNaN(inner())).toBe(true);
      //because of **var hoisting**,it actually declare at first line
      var a = 1;

      // we can only access `a` here
      expect(a).toBe(1);
    }
    outer();
  });
  it('test-scope-var-to-double-verify-function-is-just-section-of-code-actual-due-to-var-hosting', () => {
    function outer() {
      var a;
      function inner() {
        var b = 2;

        // we can access both `a` and `b` here

        return a + b;
      }

      expect(_.isNaN(inner())).toBe(true);
      //because of **var hoisting**,it actually declare at first line
      a = 1;

      // we can only access `a` here
      expect(a).toBe(1);
    }
    outer();
  });

  it('best-to-avoid-is-outside', () => {
    function other() {
      var b = 2;
      // console.log(window);
      //Cannot access a here because a belongs to outer
      try {
        console.log(a);
        expect(false).toBe(true);
      } catch (e) {
        expect(e instanceof ReferenceError).toBe(true);
      }
    }
    function outer() {
      var a = 1;

      other();
      // we can only access `a` here
      expect(a).toBe(1);
    }
    outer();
  });
  it('extra-personal-test-scope-let-is-same', () => {
    function outer() {
      let a = 1;

      function inner() {
        let b = 2;

        // we can access both `a` and `b` here
        return a + b;
      }

      expect(inner()).toBe(3);

      // we can only access `a` here
      expect(a).toBe(1);
    }
    outer();
  });
});
