const EventEmitter = require('events');

let debug = require('debug');
var validator = require('validator');
debug.enable('*');
let LOGV = debug('test');
import _ from 'lodash';
describe('async & oop & closure', () => {
    it('test-sample', () => {
        expect(true).toBeTruthy();
    });
    it('object change', () => {
        let app = {
            user: {
                name: 'jeff',
                age: 20
            },
            ordersById: {
                o1: {
                    id: 'o1',
                    total: 500,
                    itemCount: 10
                },
                o2: {
                    id: 'o2',
                    total: 200,
                    itemCount: 2
                }
            }
        };
        let oldRef = app;
        app.ordersById.o1.total = 22;
        expect(oldRef.ordersById.o1 == app.ordersById.o1).toBe(true);
    });
    it('test promise & async await', async () => {
        let rqDimensionPromise = ms => {
            let asyncPromiseObj = new Promise(resolve => {
                let dimensions = ['Hong Kong', 'China', 'ShenZhen', 'Taiwan'];
                //the async function wrapper in promise for chaining
                setTimeout(resolve(dimensions), ms);
            });
            return asyncPromiseObj;
        };

        let rqDistrictPromise = ms => {
            let asyncPromiseObj = new Promise(resolve => {
                let districts = ['Hong Kong', 'China', 'ShenZhen', 'Taiwan'];
                //the async function wrapper in promise for chaining
                setTimeout(resolve(districts), ms);
            });
            return asyncPromiseObj;
        };

        let dimensionsFromPromise;

        let districstsFromPromise;
        rqDimensionPromise(100)
            .then(res => {
                dimensionsFromPromise = res;
                return rqDistrictPromise(100);
            })
            .then(res => {
                districstsFromPromise = res;
                LOGV('promise', districstsFromPromise, dimensionsFromPromise);
            })
            .catch(e => {
                LOGV('promise fail');
            });
        try {
            let rqDimensionAsyn = await rqDimensionPromise(100);
            expect(rqDistrictAsyn[0]).toBe('Hong Konsg');
            LOGV('async dimension ', rqDimensionAsyn);
            let rqDistrictAsyn = await rqDistrictPromise(100);
            LOGV('async districts ', rqDistrictAsyn);
        } catch (e) {
            LOGV('async fail');
        }
    });

    it('test-http-response-to-map', () => {
        //     console.log(new Map(res.response.headers.entries()));
        // [...headers.entries()] or Array.from(headers.entries())
        //         console.log(res.response.headers.get('content-type'));
    });

    function getType(thing) {
        return thing.constructor.name;
    }
    it('test-declarative-object-create-method-object-literal', () => {
        var company = {
            name: 'Astri',
            employee: {
                name: 'jeff chung'
            }
        };

        expect('Astri').toBe(company.name);
        expect('Object').toBe(getType(company));
    });
    it('test-procedure-object-create', () => {
        function Company() {
            this.name = 'Astri';
            this.employee = 'jeff chung';
        }
        var company = new Company();
        expect('Astri').toBe(company.name);
        expect('Company').toBe(getType(company));
    });
    it('test-2-same-method-from-same-constructor-object-create-actually-is-different', () => {
        function Company(name, employee) {
            this.name = name;
            this.employee = employee;
            this.info = function() {
                LOGV(this.name + this.employee);
            };
        }
        var company1 = new Company('Astri', 'jeff chung');
        var company2 = new Company('Astri2', 'sss');
        //always remember that js function is complex data(so seperate)& executable
        expect(company1.info !== company2.info).toBe(true);
        expect('Astri').toBe(company1.name);
    });
    it('test-2-same-method-from-same-constructor-object-create-actually-is-different-sol-direct-point', () => {
        function info() {
            LOGV(this.name + this.employee);
        }
        function Company(name, employee) {
            this.name = name;
            this.employee = employee;
            this.info = info;
        }
        var company1 = new Company('Astri', 'jeff chung');
        var company2 = new Company('Astri2', 'sss');
        //always remember that js function is complex data(so seperate)& executable
        expect(company1.info === company2.info).toBe(true);
        expect('Astri').toBe(company1.name);
    });
    it('test-2-same-method-from-same-constructor-object-create-actually-is-different-sol-prototype', () => {
        function Company(name, employee) {
            this.name = name;
            this.employee = employee;
        }
        //every function have a common(share same memory)&predefined object property,Call **prototype**
        //if it is used as constructor,it will be the prototype of object
        Company.prototype.info = function() {
            LOGV(this.name + this.employee);
        };
        var company1 = new Company('Astri', 'jeff chung');
        var company2 = new Company('Astri2', 'sss');
        //always remember that js function is complex data(so seperate)& executable
        expect(company1.info === company2.info).toBe(true);
        expect('Astri').toBe(company1.name);
    });
    it('test-prototype-inheritance', () => {
        function Company(name, employee) {
            this.name = name;
            this.employee = employee;
        }
        Company.prototype.info = function() {
            LOGV(this.name + this.employee);
        };
        function GovernmentCompany(name, employee) {
            Company.call(this, name, employee);
            this.name = 'government' + this.name;
            this.employee = 'government' + this.employee;
        }
        //Object-create = special way to create prototype object with specific prototype of function,if it is assign to prototype of another function,then prototype inheriance chain create
        GovernmentCompany.prototype = Object.create(Company.prototype);

        GovernmentCompany.prototype.constructor = GovernmentCompany;
        //dynamic add method to close
        GovernmentCompany.prototype.close = function() {
            return false;
        };
        var company1 = new Company('Astri', 'jeff chung');
        var company2 = new GovernmentCompany('Astri2', 'sss');
        // same inheriance function template& same inheriance memory
        expect(company1.info === company2.info).toBe(true);

        expect('Astri').toBe(company1.name);
        expect('governmentAstri2').toBe(company2.name);
        expect(company1 instanceof Company).toBe(true);
        expect(company2 instanceof GovernmentCompany).toBe(true);
        expect(company2 instanceof Company).toBe(true);
        expect(company2.close()).toBe(false);
        var fakeCompany = {
            name: 'fake ss'
        };
        expect(fakeCompany instanceof Company).toBe(false);
        Object.setPrototypeOf(fakeCompany, Company.prototype);
        expect(fakeCompany instanceof Company).toBe(true);
    });
    it('test-internal-function', () => {
        function betterExampleNeeded() {
            var a = 1;
            function oneMoreThanA() {
                return a + 1;
            }
            return oneMoreThanA() + 10;
        }
        expect(12).toBe(betterExampleNeeded());

        expect(typeof betterExampleNeeded === 'function').toBe(true);

        expect(typeof oneMoreThanA === 'function').toBe(false);
    });
    //In javascript.a  function that make function,the maked function remember the scope that are created
    it('test-closure', () => {
        function makeAdder(baseNum) {
            return function(numBeingAdded) {
                return baseNum + numBeingAdded;
            };
        }

        var add5er = makeAdder(5);
        var add20er = makeAdder(20); // ?
        //add5er and add20er are closure,they remember the scope of 5&10 for its a
        expect(11).toBe(add5er(6));
        //no people can run time change the adder of add 20
        expect(27).toBe(add20er(7));
        expect(27).toBe(add20er(7));
        //OOP implementation
        class Adder {
            constructor(baseNum) {
                this.baseNum = baseNum;
            }
            execute(numBeingAdded) {
                return this.baseNum + numBeingAdded;
            }
        }

        var addO5er = new Adder(5);
        var addO20er = new Adder(20); // ?
        expect(11).toBe(addO5er.execute(6));
        //the adder base num is accessable via addO5er .And still run time changable.(lower the readability)
        expect(27).toBe(addO20er.execute(7));
        expect(27).toBe(addO20er.execute(7));
    });
    it('test-o', () => {
        function O(a, b) {
            this.a = a;
            this.b = b;
        }
        O.prototype.b = 3;
        O.prototype.c = 4;

        let o = new O(1, 2);

        let o2 = new O(10, 20);

        expect(1).toBe(o.a);
        //
        expect(2).toBe(o.b);

        expect(4).toBe(o.c);
        O.prototype.c = 16;
        expect(10).toBe(o2.a);
        //
        expect(20).toBe(o2.b);
        //using same type of memory of prototype
        expect(16).toBe(o2.c);
        expect(16).toBe(o.c);
    });
    it('test-weird', () => {
        var o = {
            a: 2,
            m: function() {
                return this.a + 1;
            }
        };
        expect(3).toBe(o.m());
        // console.log(o.m()); // 3  t.is(3,o.m());

        // 当调用 o.m 时,'this'指向了o.

        var p = Object.create(o);
        // p is a object with prototype o.
        expect(2).toBe(p.a);

        p.a = 12; // 创建 p 的自身属性a.
        expect(13).toBe(p.m());
    });
    it('test-es-6-sugar', () => {
        class Company {
            constructor(name, employee) {
                this.name = name;
                this.employee = employee;
            }
            info() {
                return this.name + this.employee;
            }
        }
        //change the prototype chain and the constructor assignment
        class GovernmentCompany extends Company {
            constructor(name, employee) {
                super(name, employee);
                this.name = 'government' + this.name;
                this.employee = 'government' + this.employee;
            }
        }
        class PrivateCompany extends Company {
            constructor(name, employee) {
                super(name, employee);
                this.name = 'private' + this.name;
                this.employee = 'private' + this.employee;
            }
        }
        var company1 = new Company('Astri', 'jeff chung');
        var company2 = new GovernmentCompany('Astri2', 'sss');
        var company3 = new PrivateCompany('Astri3', 'eee');
        // same inheriance function template& same inheriance memory
        expect(
            company1.info === company2.info && company1.info === company3.info
        ).toBe(true);
        //
        expect('Astri').toBe(company1.name);
        expect('governmentAstri2').toBe(company2.name);
        expect(company1 instanceof Company).toBe(true);
        expect(company2 instanceof GovernmentCompany).toBe(true);
        expect(company2 instanceof Company).toBe(true);
        expect(company3 instanceof PrivateCompany).toBe(true);
        expect(company3 instanceof Company).toBe(true);
        // t.false(company2.close());
    });
    it('test-defensive-setter', () => {
        class Person {
            //remember setter always
            constructor(fullName) {
                //object instead on object prototype
                this.fullName = fullName;
            }
            get fullName() {
                return this.givenName + this.sureName;
            }
            set fullName(fullName) {
                if (!validator.contains(fullName, ' ')) {
                    throw new Error('fullName have no space');
                }
                this.givenName = fullName.split(' ')[0];
                this.sureName = fullName.split(' ')[1];
            }
            set age(age) {
                if (!validator.isInt(age + '')) {
                    throw new Error('age is not integer');
                }
                this._age = age;
            }
            get age() {
                return this._age;
            }
        }
        let jeff = new Person('Jeff Chung');
        jeff.age = 12;
        expect(12).toBe(jeff.age);
        expect('Jeff').toBe(jeff.givenName);
        expect('Chung').toBe(jeff.sureName);
        try {
            let wrongName = new Person('JeffChung');
            expect(false).toBeTruthy();
        } catch (e) {
            expect(true).toBeTruthy();
        }
        try {
            jeff.age = 12.5;
            expect(false).toBeTruthy();
        } catch (e) {
            expect(true).toBeTruthy();
        }
    });
    it('test-getter-and-setter', () => {
        class Person {
            constructor(givenName, sureName) {
                //object instead on object prototype
                this.givenName = givenName;
                this.sureName = sureName;
            }
            get fullName() {
                return this.givenName + this.sureName;
            }
            set fullName(fullName) {
                this.givenName = fullName.split(' ')[0];
                this.sureName = fullName.split(' ')[1];
            }
        }
        let jeff = new Person('jeff', 'chung');
        expect('jeffchung').toBe(jeff.fullName);
        expect('jeff').toBe(jeff.givenName);
        expect('jeffchung').toBe(jeff.fullName);
        jeff.fullName = 'Jeff Chung';
        expect('Jeff').toBe(jeff.givenName);
        expect('Chung').toBe(jeff.sureName);
    });
    it('test-array-spread-to-turn-array-to-multiple-array-params', () => {
        class Person {
            constructor(givenName, surnName) {
                //object instead on object prototype
                this.givenName = givenName;
                this.sureName = surnName;
            }
        }

        let info = ['jeff', 'chung'];
        let jeff = new Person(...info);
        expect('jeff').toBe(jeff.givenName);
        expect('chung').toBe(jeff.sureName);
    });
    it('test-object-deserializer', () => {
        let info = {sureName: 'jeff', givenName: 'chung'};
        //object spread used to create object
        let {sureName, givenName} = info;
        expect(sureName).toBe('jeff');
        expect(givenName).toBe('chung');
    });
    it('test-object-spread-to-create-object', () => {
        let info = {sureName: 'jeff', givenName: 'chung'};
        //object spread used to create object
        let jeff = {...info, fullName: 'jeffchung', sureName: 'superjeff'};

        expect(jeff.givenName).toBe('chung');
        expect(jeff.sureName).toBe('superjeff');
        expect(jeff.fullName).toBe('jeffchung');
    });
    //jsx has spread operator but it is not the same implementation,the Compiler do completely different job
    it('call-function-using-object-property-as-parameter-which-is-useless-because-function-based-on-position', () => {});
    it('test-array-rest-to-turn-params-in-function-to-arr', () => {
        class Person {
            constructor(...name) {
                //object instead on object prototype
                this.givenName = name[0];
                this.sureName = name[1];
            }
        }

        let jeff = new Person('jeff', 'chung');
        expect('jeff').toBe(jeff.givenName);
        expect('chung').toBe(jeff.sureName);
    });

    it('test-promise-single', () => {
        //direct create a promise object to represent a async operation
        var promiseOperationObj = new Promise((resolve, reject) => {
            let total = 0;
            for (let i = 0; i < 100; i++) {
                total += i;
            }
            //resolve definition
            resolve(total);
        });
        //start asyn  operation in promise,check resolve or not
        return promiseOperationObj.then(
            result => {
                expect(4950).toBe(result);
            },
            onResolveFailPara => {
                LOGV('error');
            }
        );
    });
    it('test-promise-chain', () => {
        var promise = new Promise(function(resolve, reject) {
            resolve(1);
        });
        return promise
            .then(function(val) {
                // console.log(val); // 1
                return val + 2;
            })
            .then(function(val) {
                // console.log(val);
                expect(3).toBe(val);
            });
    });
    it('test-promise-chain-by-resolve-promise-staff', () => {
        var promise = new Promise(function(resolve, reject) {
            resolve(1);
        });
        function createPromiseObj2(previous) {
            return new Promise((resolve, reject) => {
                resolve(previous + 2);
            });
        }
        return promise
            .then(function(val) {
                // console.log(val); // 1
                return createPromiseObj2(val);
            })
            .then(function(val) {
                // console.log(val);
                expect(3).toBe(val);
            });
    });
    it('test-custom-promise-chain-by-then', () => {
        //direct create a promise object to represent a async operation
        var promiseOperationObj = new Promise((resolve, reject) => {
            let total = 0;
            for (let i = 0; i < 100; i++) {
                total += i;
            }
            resolve(total);
        });

        return promiseOperationObj
            .then(result => {
                let total = 0;

                for (let i = 0; i < 50; i++) {
                    total += i;
                }
                return total + result;
            })
            .then(sum => {
                expect(6175).toBe(sum);
            });
    });
    it('test-custom-promise-chain', () => {
        //direct create a promise object to represent a async operation
        var promiseOperationObj = new Promise((resolve, reject) => {
            let total = 0;
            for (let i = 0; i < 100; i++) {
                total += i;
            }
            resolve(total);
        });
        var CreatePromiseObj2 = function(previous) {
            return new Promise(function(resolve, reject) {
                let total = 0;
                for (let i = 0; i < 50; i++) {
                    total += i;
                }

                total = total + previous;
                resolve(total);
            });
        };
        return promiseOperationObj
            .then(result => {
                let promiseOperationObj2 = new CreatePromiseObj2(result);
                return promiseOperationObj2;
            })
            .then(sum => {
                expect(6175).toBe(sum);
            });
    });

    it('test-scope-global', () => {
        var a = 1;

        // global scope
        function one() {
            return a;
        }
        expect(1).toBe(one());
    });
    it('test-scope-local', () => {
        var a = 1;
        function two(a) {
            //the function scope,parameter a has higher scope
            return a; // alerts the given argument, not the global value of '1'
        }

        // local scope again
        function three() {
            var a = 3;
            return a; // alerts '3'
        }
        expect(2).toBe(two(2));
        expect(3).toBe(three());
    });
    it('test-intermediate-local-scope-due-to-variable-increase', () => {
        var a = 1;

        function four() {
            if (true) {
                var a = 4;
            }

            return a; // alerts '4', not the global value of '1'
        }
        /*reality

  function four() {
    var a;
    if (true) {
      a = 4;
    }

    return (a); // alerts '4', not the global value of '1'
  }
  */
        expect(4).toBe(four());
    });
    it('test-object-scope', () => {
        var a = 1;

        function Five() {
            this.a = 5;
        }
        let ins = new Five();
        expect(5).toBe(ins.a);
    });
    it('test-closure-scope', () => {
        var a = 1;
        var createClosureOfSpecificNum6 = function() {
            var a = 6;
            return function() {
                return a;
            };
        };
        var functionHaveLocalScope = createClosureOfSpecificNum6();
        expect(6).toBe(functionHaveLocalScope());
    });
    it('test-scope-increment', () => {
        var foo = 1;
        function bar() {
            //referencing the local scope variable object(because it is declare here) foo which is undefined

            if (foo === undefined) {
                // LOGV('changing the local scope foo');
                var foo = 10;
            }
            return foo;
        }
        expect(10).toBe(bar());
    });
    it('test-scope-increment-of-let-not-happen', () => {
        var foo = 1;
        function bar() {
            if (foo === undefined) {
                LOGV('changing the local scope foo');
                let foo = 10;
            }
            return foo;
        }
        expect(1).toBe(bar());
    });
    it('test-error-handling-in-debug-mode-should-reflow', () => {
        const debug = true;
        function errorCall() {
            var foo = {};
            return foo.bar();
        }
        //
        try {
            errorCall();
        } catch (ex) {
            if (debug) {
                expect(true).toBeTruthy();
                //throw ex;
            } else {
                expect(false).toBeTruthy();
            }
        }
    });
});
// class Action{
//
// }
// function openDrawer():Action {
//   return {
//     type: 'OpenDrawer',
//   };
// }
