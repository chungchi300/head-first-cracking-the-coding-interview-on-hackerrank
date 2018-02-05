'use strict';

import _ from 'lodash';

describe('Lexical scope-Javascript Scope Model', () => {
  it('javascript is compiled language,but just 1 line(In fact it is the  lexer time(the compiler token code))', () => {
    function foo(a) {
      var b = a * 2;

      function bar(c) {
        expect(a).toBe(2);
        expect(b).toBe(4);
        expect(c).toBe(12);
      }

      bar(b * 3);
    }

    foo(2); // 2 4 12
  });
  it('scope always find the inner first,when outside variable have same variable,it will not be accessed,it called shadowed', () => {
    function foo(a) {
      var b = a * 2;

      function bar() {
        var b = 10;
        expect(a).toBe(2);
        expect(b).toBe(10);
      }
      expect(b).toBe(4);
      bar();
    }

    foo(2);
  });
  it('same applied to global scope too ,but global scope property assigned to window(if javascript),it is one special to direct to global scope ', () => {
    global.b = 20;
    function foo(a) {
      var b = a * 2;

      function bar() {
        expect(a).toBe(2);
        expect(b).toBe(4);
        expect(global.b).toBe(20);
      }
      expect(b).toBe(4);
      bar();
    }
    expect(global.b).toBe(20);
    foo(2);
  });
});

describe('Cheating lexical,Both are bad because drastically decrease code readability & performance(JS optimization engine cannot work on them )', () => {
  it('eval', () => {
    function foo(str, a) {
      // eval(str); // cheating!
      // console.log(a, b);
      expect(a).toBe(1);
      //Actually it don't work because it is strict mode
      expect(b).toBe(2);
    }

    var b = 2;

    foo('var b = 3;', 1); // 1 3
  });
  it('with increase the object variable to the topest of context', () => {
    //WARNING not feasible in strict mode
    // var person = new Object();
    // person.name = 'jeff';
    // person.age = 26;
    // function changePerson(person) {
    //     var name = 'mandy';
    //
    //     with (person) {
    //         var name = 'mandy+jeff';
    //     }
    //
    // }
    // changePerson(person);
    // expect(person.name).toBe('mandy+jeff');
  });
});
