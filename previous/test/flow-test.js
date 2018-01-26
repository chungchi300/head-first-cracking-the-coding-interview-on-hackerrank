/* @flow */

const EventEmitter = require('events');

let debug = require('debug');
var validator = require('validator');
debug.enable('*');
//variable wrong assign
it('test-redux-action-meaning-wrong', () => {
    let str: number = 'hello world!';
});
it('test-redux-action-meaning-correction', () => {
    let str: number = 22;
});
it('test-function-creation-wrong', () => {
    //
    function calculateStrDoubleLength(x: string, y: number): string {
        return x.length * y;
    }
    calculateStrDoubleLength('Hello', 42);
});

it('test-function-creation-correction', () => {
    //
    function calculateStrDoubleLength(x: string, y: number): number {
        return x.length * y;
    }
    calculateStrDoubleLength('Hello', 42);
});
