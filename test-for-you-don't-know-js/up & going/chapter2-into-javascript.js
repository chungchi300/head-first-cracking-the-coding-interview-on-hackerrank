import _ from 'lodash';
function returnNothing() {
  let d = 1;
}
describe('values&primitive types', () => {
  it('primitive types&object', () => {
    //KNOWLEDGE:javascript a dynamic type language that variable can hold different type values
    //declare variable without assignment is undefined
    var a;
    expect(typeof a).toBe('undefined');

    a = 'hello world';
    expect(typeof a).toBe('string');

    a = 42;
    expect(typeof a).toBe('number');

    a = true;
    expect(typeof a).toBe('boolean');
    // "object" -- weird, bug
    a = null;
    expect(typeof a).toBe('object');

    a = undefined;
    expect(typeof a).toBe('undefined');
    a = { b: 'c' };
    expect(typeof a).toBe('object');
    a = returnNothing();
    expect(typeof a).toBe('undefined');
    //TODO test void operator in future
  });
});
describe('object', () => {
  it('basic', () => {
    //object is a compound values that has properties(A Safe pointer you can said)
    var obj = {
      a: 'hello world',
      b: 42,
      c: true,
    };
    expect(obj.a).toBe('hello world');
    expect(obj.b).toBe(42);
    expect(obj.c).toBe(true);
  });
  it('access properties by notation', () => {
    //object is a compound values that has properties(A Safe pointer you can said)
    var obj = {
      a: 'hello world',
      b: 42,
      c: true,
    };
    expect(obj['a']).toBe('hello world');
    expect(obj['b']).toBe(42);
    expect(obj['c']).toBe(true);
    //Notation can dynamic assign and get special character properties
    obj['special-character-property'] = 'dorime';
    expect(obj['special-character-property']).toBe('dorime');
    //Notatation it mean call object variable by string name(Mirror term in Java)
    let mirrorProperty = 'special-character-property';
    expect(obj[mirrorProperty]).toBe('dorime');
  });
});
describe('array - just an object,but not hold named properties but numerically indexed position', () => {
  it('basic', () => {
    var arr = ['hello world', 42, true];
    expect(arr[0]).toBe('hello world');
    expect(arr[1]).toBe(42);
    expect(arr[2]).toBe(true);
    expect(arr.length).toBe(3);
    expect(typeof arr).toBe('object');
  });
  it('object nature but avoid use it like this for inproper usage', () => {
    var arr = ['hello world', 42, true];
    expect(arr[0]).toBe('hello world');
    expect(arr[1]).toBe(42);
    expect(arr[2]).toBe(true);
    arr['special-character-property'] = 'dorime';
    expect(arr.length).toBe(3);
    expect(arr['special-character-property']).toBe('dorime');

    expect(typeof arr).toBe('object');
    //The best and most natural approach is to use arrays for numerically positioned values and use objects for named properties.
  });
});
describe('function - subtype of object but executable', () => {
  it('basic', () => {
    function foo() {
      return 42;
    }

    foo.bar = 'hello world';

    expect(typeof foo).toBe('function');
    expect(typeof foo()).toBe('number');
    expect(typeof foo.bar).toBe('string');
    //TODO  typically will only use function object properties (like foo.bar) in limited cases.
  });
});
describe('built in primitive types methods', () => {
  it('basic', () => {
    var a = 'hello world';
    var b = 3.14159;

    expect(a.length).toBe(11); // 11
    expect(a.toUpperCase()).toBe('HELLO WORLD'); // "HELLO WORLD"
    expect(b.toFixed(4)).toBe('3.1416'); // "3.1416"
  });
  it('the truth basic that primitive types value being boxed ', () => {
    var a = 'hello world';
    var b = 3.14159;

    expect(String(a).length).toBe(11); // 11
    expect(String(a).toUpperCase()).toBe('HELLO WORLD'); // "HELLO WORLD"
    expect(Number(b).toFixed(4)).toBe('3.1416'); // "3.1416"
  });
});
describe('coercion & compare values', () => {
  it('explicit', () => {
    var a = '42';

    var b = Number(a);

    expect(a).toBe('42'); // "42"
    expect(b).toBe(42); // 42 -- the number!
  });

  it('implicit', () => {
    //KNOWLEDGE:javascript allow implicit coercion so that it is weak type programming language
    var a = '42';

    var b = a * 1;

    expect(a).toBe('42'); // "42"
    expect(b).toBe(42); // 42 -- the number!
  });
  it('falsy', () => {
    //KNOWLEDGE:  The result of any comparison is a strictly boolean value (true or false), regardless of what value types are compared.
    expect(Boolean('')).toBe(false);
    expect(Boolean(0)).toBe(false);
    expect(Boolean(-0)).toBe(false);
    expect(Boolean(NaN)).toBe(false);
    expect(Boolean(null)).toBe(false);
    expect(Boolean(undefined)).toBe(false);
    expect(Boolean(false)).toBe(false);
  });
  it('truthy', () => {
    function foo() {
      return 42;
    }

    //KNOWLEDGE:  The result of any comparison is a strictly boolean value (true or false), regardless of what value types are compared.
    expect(Boolean('hellow')).toBe(true);
    expect(Boolean(42)).toBe(true);
    expect(Boolean(-42)).toBe(true);
    expect(Boolean([])).toBe(true);
    expect(Boolean([1, '2', 3])).toBe(true);
    expect(Boolean({})).toBe(true);
    expect(Boolean({ a: 'dd' })).toBe(true);
    expect(Boolean(foo)).toBe(true);
  });
  it('equality', () => {
    //== checks for value equality with coercion(implicit) allowed, and === checks for value equality without allowing coercion; === is often called "strict equality" for this reason.
    var a = '42';
    var b = 42;
    // In the a == b comparison, JS notices that the types do not match, so it goes through an ordered series of steps to coerce one or both values to a different type until the types match, where then a simple value equality can be checked.
    // therefore a == b do more calculation,become it try more way to get possitive
    //and the '42' turn to 42  for the checking
    expect(a == b).toBe(true);

    expect(a === b).toBe(false);
  });
  it('use equality and strict equality properly', () => {
    //cound be boolean,0,"",[] , use strict equality
    let born = false;
    let age = 0;
    let brithday = [];
    let name = '';
    expect(born === false).toBe(true);
    expect(age === 0).toBe(true);
    expect([] !== []).toBe(true);
    expect(name === '').toBe(true);
    //other use safe
  });
  it('equality on object,all of them are reference', () => {
    var a = [1, 2, 3];
    var c = a;
    var b = [1, 2, 3];
    expect(a == b).toBe(false);
    expect(a == c).toBe(true);
    expect(a === c).toBe(true);
  });
  it('coercion of array', () => {
    var a = [1, 2, 3];
    var c = '1,2,3';
    expect(a == c).toBe(true);
  });
  it('coercion of array', () => {
    var a = [1, 2, 3];

    expect(a + '').toBe('1,2,3');
  });
  it('no coercion of array', () => {
    var a = [1, 2, 3];
    var c = '1,2,3';
    expect(a === c).toBe(false);
  });
  it('inequality,also do coercion  and do not have strict mode', () => {
    var a = 41;
    var b = '42';
    var c = '43';
    //they try their best to be true
    expect(a < b).toBe(true);
    expect(b < c).toBe(true);
  });
  it('inequality ,do not have strict rule,and do not throw exception', () => {
    var a = 41;
    var b = 'foo';

    expect(a < b).toBe(false); // false
    expect(a > b).toBe(false); // false
    expect(a == b).toBe(false); // false
  });
});
describe('variable', () => {
  //KNOWLEDGE:var scope,declare in outside of function = global scope,declared in function mean functional scope
  it('hositing', () => {
    //var appear in to global scope
    var a = 2;

    foo(); // works because `foo()`
    // declaration is "hoisted"

    function foo() {
      //SKILL:Put Variable to the top to avoid variable hosting
      a = 3;

      expect(a).toBe(3);

      var a; // declaration is "hoisted"
      // to the top of `foo()`
    }
    expect(a).toBe(2);
  });
  it('access outside scope when cannot found', () => {
    //var appear in to scope
    var a = 2;

    foo(); // works because `foo()`
    // declaration is "hoisted"

    function foo() {
      a = 3;

      expect(a).toBe(3);
    }
    expect(a).toBe(3);
  });
  it('nested scope', () => {
    function foo() {
      var a = 1;

      function bar() {
        var b = 2;

        function baz() {
          var c = 3;
          expect(a).toBe(1);
          expect(b).toBe(2);
          expect(c).toBe(3);
        }

        baz();
        expect(a).toBe(1);
        expect(b).toBe(2);
        try {
          expect(c).toBe(2);
          expect(true).toBe(false);
        } catch (e) {
          console.log(
            'c is attached to barz() scope so there is noc in bar()',
            e.message
          );
        }
      }

      bar();
      expect(a).toBe(1);
    }

    foo();
  });
  it('bad practice', () => {
    function foo() {
      try {
        a = 1; // `a` not formally declared
        expect(true).toBe(false);
      } catch (e) {
        console.log('undeclared var is not allowed in strict mode', e.message);
      }
    }

    foo();
    // a; // 1 -- oops, auto global variable :(
  });
  it('block scoping', () => {
    function foo() {
      var result = [];
      var a = 1;
      //if b is var,it will be undefined and declared at foo

      if (a >= 1) {
        let b = 2;

        while (b < 5) {
          let c = b * 2;
          b++;
          result.push(a + c);
        }
      }
      expect(String(result)).toBe('5,7,9');
    }

    foo();
  });
});
describe('conditional', () => {
  //TODO just basic control structure
});
describe('strict mode', () => {
  //TODO strict mode always on top
});
describe('Functions As Values', () => {
  it('static function declare is just declare one in global scope', () => {
    function foo() {
      // ..
    }
    expect(typeof foo).toBe('function');
  });
  it('static function equivalent', () => {
    var foo = function() {
      // ..
    };
    expect(typeof foo).toBe('function');
  });
  it('iife', () => {
    var foo = function() {
      expect(false).toBe(true);
    };
    (function IIFE() {
      //DO execute
      expect(true).toBe(true);
    })();
  });
  it('iife can access and change global scope,but it do not declare variable in global scope', () => {
    var a = 42;

    (function IIFE() {
      a = 10;
      expect(a).toBe(10);
    })();
    expect(a).toBe(10);
    try {
      console.log(IIFE);
    } catch (e) {
      expect(e instanceof ReferenceError).toBe(true);
    }

    // it('so do inner function if declared', () => {
  });
  it('iife can access and change global scope,but it do not declare variable in global scope', () => {
    var a = 42;

    function NIIFE() {
      a = 10;
      expect(a).toBe(10);
    }
    NIIFE();
    //create the var in global
    expect(a).toBe(10);

    expect(typeof NIIFE === 'function').toBe(true);
  });
  it('closure a bility that inner function can continue to access function scope and variable even once the function has finished running', () => {
    function makeAdder(x) {
      // parameter `x` is an inner variable

      // inner function `add()` uses `x`, so
      // it has a "closure" over it
      function add(y) {
        return y + x;
      }

      return add;
    }
    //KNOWLEDGE:Function called in javascript is all passed by copy
    var oneAdder = makeAdder(1);
    var twoAdder = makeAdder(2);

    //IMAGINATION: function execution is creating the scope and copying the parameter and attached to scope object,
    //If the return parameter is a function,and still accessing the scope,the scope is some how remembered

    //the function(object) has the scope parameter to remember the calling environment
    expect(oneAdder(2)).toBe(3);
    expect(twoAdder(2)).toBe(4);
  });
  it('closure application pattern - module pattern', () => {
    function User() {
      var username = '';
      var password = '';
      function addScretMessage() {
        return 'jeff';
      }
      function doLogin(user, pw) {
        //can still access outer scope,username ,password
        username = user;
        password = pw;

        // do the rest of the login work
        password = addScretMessage() + pw;
      }
      function getUsernameAndPassword() {
        return username + password;
      }
      //create an object with function
      var publicAPI = {
        login: doLogin,
        getUsernameAndPassword: getUsernameAndPassword,
      };

      return publicAPI;
    }

    // create a `User` module instance
    var fred = User();
    expect(fred.getUsernameAndPassword()).toBe('');
    fred.login('fred', '12Battery34!');
    //A Skill to utilize closure property & scope model to create object that have hide implementation(e.g addScretMessage,username,password,they are stored at the outer.scope.object)
    //A good way to mimick private and public property
    expect(fred.getUsernameAndPassword()).toBe('fredjeff12Battery34!');
  });
});
describe('this Identifier', () => {
  it('this refer is really depend on who call him', () => {
    function foo() {
      // try {
      return this.bar;
    }

    var bar = 'global';

    var obj1 = {
      bar: 'obj1',
      foo: foo,
    };

    var obj2 = {
      bar: 'obj2',
    };

    // --------

    // foo(); // "global"
    expect(obj1.foo()).toBe('obj1'); // "obj1"
    expect(foo.call(obj2)).toBe('obj2'); // "obj2"
    expect(typeof new foo()).toBe('object'); //new create an object
  });
});
describe('Prototypes', () => {
  it('access non exsiting property will find parent from chain', () => {
    var foo = {
      a: 42,
      c: 'c in foo',
    };

    // create `bar` and link it to `foo`
    var bar = Object.create(foo);

    bar.b = 'hello world';
    bar.c = 'c in bar';
    expect(bar.b).toBe('hello world');
    // cannot find a in bar,so access parent foo
    expect(bar.a).toBe(42);
    //already find c in bar,so stop access parent foo
    expect(bar.c).toBe('c in bar');
  });
});
describe('Polyfilling', () => {
  //TODO not tddable
  //dynamically add function if not existed
});
describe('Transpiling', () => {
  //TODO not tddable
  //transfer code
});
