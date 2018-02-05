'use strict';

import _ from 'lodash';

describe('What is scope', () => {
  it('basic,variable give program ability to save state,but how to store&retrieve is controlled by rules called scope', () => {});
  it('javascript is compiled language,but just 1 line(called just in time runner)', () => {
    //day number 1,
    //compiler(trip manager) : hello scope(hotel manager),is there scope room01 in your entire hotel?
    //scope(hotel manager) : We don't but we can prepare now and get it immediately if you want(before tommorow)
    //compiler:yes,create it please
    //scope:done-
    //Excution:(Day 1)Room A hold tourist 1"obama"
    var room01 = 1;
    //compiler(trip manager) : hello scope(hotel manager),is there scope room01 in your entire hotel?
    //compiler:yes
    //Excution:(Day 2)Room A hold tourist 2"donald"
    var room01 = 2;
    //compiler(trip manager) : hello scope(hotel manager),is there scope room01 in your entire hotel?
    //compiler:yes,shit up and take my money
    //Excution:(Day 3)Room A,"donald" give speech on room01
    console.log(room01);
  });
  it('nested', () => {
    //day number 1,
    //compiler(trip manager) : hello scope(hotel manager),is there scope room01 in your entire hotel?
    //scope(hotel manager) : We don't but we can prepare now and get it on  tommorow
    //compiler:yes,shit up and take my money
    //scope:done
    //Excution:(Day 1)Room A hold tourist 1"obama",obama cannot find it in 1 floor(current scope),but manage to find it at upper floor(global scope)
    var room01 = 1;
    function story1() {
      //compiler(trip manager) : hello scope(hotel manager),is there scope room01 in your entire hotel?
      //compiler:yes,shit up and take my money
      //Excution:(Day 2)Room A,"obama" give speech on room01
      console.log(room01);
    }
  });
  it('strict mode mean compiler is follow the rules,do not create extra room even the story told so', () => {
    var room01 = 1;
    //clone a people of room01,because it is strict mode,the compiler will not tell scope to secretly create the room
    try {
      room02 = room01;
      expect(true).toBe(false);
    } catch (e) {
      expect(e instanceof ReferenceError).toBe(true);
    }
  });
});
