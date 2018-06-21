describe("variable ", () => {
  it("Factory Pattern", () => {
    function createPerson(name, age, job) {
      var o = new Object();
      o.name = name;
      o.age = age;
      o.job = job;
      o.sayName = function() {
        alert(this.name);
      };
      return o;
    }
    var person1 = createPerson("Nicholas", 29, "Software Engineer");
    var person2 = createPerson("Greg", 27, "Doctor");
    expect(person1.age).toBe(29);
    //Advantage - multiple instance
    expect(person2.age).toBe(27);
    //Disadvantage - object identification, can it be instanceOf createPerson?
    expect(person1 instanceof Object).toBe(true);
  });
  it("Constructor Pattern", () => {
    function Person(name, age, job) {
      //when reference type called with "new" character,this(an empty object) is created by default
      console.log("the this", this);
      this.name = name;
      this.age = age;
      this.job = job;

      this.sayName = function() {
        alert(this.name);
      };
    }
    var person1 = new Person("Nicholas", 29, "Software Engineer");
    var person2 = new Person("Greg", 27, "Doctor");
    expect(person1.age).toBe(29);
    //Advantage - multiple instance
    //Advantage - object identification, can it be instanceOf createPerson?
    expect(person2.age).toBe(27);
    expect(person1 instanceof Person).toBe(true);
    //Disadvantage sayName is logically equivalent by now using different memory space,memory waste
    expect(person1.sayName == person2.sayName).toBe(false);
  });
  it("Prototype Pattern", () => {
    function Person(name, age, job) {}
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "Software Engineer";
    var person1 = new Person();
    var person2 = new Person();
    expect(person1.age).toBe(29);

    //Advantage - object identification, can it be instanceOf createPerson?
    expect(person2.age).toBe(29);
    expect(person1 instanceof Person).toBe(true);
    //Advantage sayName is logically equivalent by now using different memory space,memory waste

    //Disadvantage - no split memory space of age & job
    expect(person1.sayName == person2.sayName).toBe(true);
  });
  it("combination Constructor&Prototype Pattern ", () => {
    function Person(name, age, job) {
      this.name = name;
      this.age = age;
      this.job = job;
    }
    Person.prototype = {
      constructor: Person,
      sayName: function() {
        alert(this.name);
      }
    };
    var person1 = new Person("Nicholas", 29, "Software Engineer");
    var person2 = new Person("Greg", 27, "Doctor");
    expect(person1.age).toBe(29);
    //Advantage - multiple instance
    //Advantage - object identification, can it be instanceOf createPerson?
    expect(person2.age).toBe(27);
    expect(person1 instanceof Person).toBe(true);
    //Disadvantage sayName is logically equivalent by now using different memory space,memory waste
    expect(person1.sayName == person2.sayName).toBe(true);
  });
});
