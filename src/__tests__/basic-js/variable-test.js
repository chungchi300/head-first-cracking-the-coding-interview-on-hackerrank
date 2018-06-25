describe("variable ", () => {
  it("dynamic property", () => {
    expect(1 + 2).toBe(3);
    let person = new Object();
    person.name = "jeff";
    expect(person.name).toBe("jeff");
    delete person["name"];
    expect(person.name).toBe(undefined);
  });
  it("all copy by value,and object copy the value which is a reference", () => {
    let a = 1;
    let b = a;
    expect(a).toBe(1);
    expect(b).toBe(1);
    b = 2;
    expect(a).toBe(1);
    expect(b).toBe(2);
    let personA = new Object();
    personA.name = "jeff";
    let personB = personA;

    expect(personA.name).toBe("jeff");
    expect(personB.name).toBe("jeff");
    personB.name = "mandy";
    expect(personA.name).toBe("mandy");
    expect(personB.name).toBe("mandy");
  });
  it("object passing deep", () => {
    function setName(obj, prim) {
      expect(arguments[1]).toBe("demo");
      prim = "lalala";
      //passed by value which is a ference
      obj.name = "Nicholas";
      //show it is not passed by reference,the obj is referncing the new object
      obj = new Object();
      obj.name = "Greg";
    }
    var person = new Object();
    let prim = "demo";
    setName(person, prim);
    expect(person.name).toBe("Nicholas");
    expect(prim).toBe("demo");
    //'Nicholas'
  });
  it("type strategy", () => {
    let a = "jeff";
    let b = 1;
    let c = null;
    let d;
    let e = false;
    let f = new Object();
    let g = new Array();
    let t = function() {
      return "d";
    };
    expect(typeof a).toBe("string");
    expect(typeof b).toBe("number");
    //WARNING type of null is object !!!
    expect(typeof c).toBe("object");
    expect(typeof d).toBe("undefined");
    expect(typeof e).toBe("boolean");
    expect(typeof f).toBe("object");
    expect(typeof g).toBe("object");
    expect(typeof t).toBe("function");

    expect(a instanceof Object).toBe(false);
    expect(c instanceof Object).toBe(false);
    expect(f instanceof Object).toBe(true);
    //Prototype chain of reference value
    expect(g instanceof Object).toBe(true);
    expect(g instanceof Array).toBe(true);
    expect(t instanceof Object).toBe(true);
    expect(t instanceof Function).toBe(true);
  });
  it("scope chain and execution context global and function", () => {
    var color = "blue";
    function changeColor() {
      if (color === "blue") {
        color = "red";
      } else {
        color = "blue";
      }
    }
    changeColor();
    expect(color).toBe("red");
  });
  it("scope chain and execution context global and function and nested function", () => {
    var color = "blue";

    function changeColor() {
      var anotherColor = "red";
      function swapColor() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
      }
      swapColor();
      expect(anotherColor).toBe("blue");
    }
    changeColor();
    expect(color).toBe("red");
    try {
      expect(anotherColor);
      expect(false).toBe(true);
    } catch (e) {
      expect(true).toBe(true);
    }
  });
  it("with increase the object variable to the topest of context", () => {
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
