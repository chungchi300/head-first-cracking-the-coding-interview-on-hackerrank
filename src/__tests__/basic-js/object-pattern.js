describe("extra", () => {
  it("object-literal", () => {
    var company = {
      name: "Astri",
      employee: {
        name: "jeff chung"
      }
    };

    expect("Astri").toBe(company.name);
    expect(company instanceof Object).toBe(true);
  });

  it("test-procedure-object-create", () => {
    function Company() {
      this.name = "Astri";
      this.employee = "jeff chung";
    }
    var company = new Company();
    expect("Astri").toBe(company.name);
    expect(company instanceof Object).toBe(true);
  });
});
describe("oop ", () => {
  /*
    Our target
    1. multiple instance(split memory) for variable 
    2. identical (share memory) for function
    3. Identification of creator reference types by instance of
    4. Private property or method
*/
  it("factory pattern", () => {
    function createCompany(name, employee) {
      let object = new Object();
      object.name = name;
      object.employee = employee;
      object.info = function() {
        LOGV(object.name + object.employee);
      };
      return object;
    }
    var company1 = createCompany("Astri", "jeff chung");
    var company2 = createCompany("Astri2", "sss");
    //Disadvantage :Identification of creator reference types by instance of
    expect("Astri").toBe(company1.name);
  });
  it("constructor pattern", () => {
    function Company(name, employee) {
      //every time function is called with new,it has variable this which is empty object{} and related prototype,it will be returned by default
      console.log("this", this);
      this.name = name;
      this.employee = employee;
      this.info = function() {
        LOGV(this.name + this.employee);
      };
      console.log("this", this);
    }
    var company1 = new Company("Astri", "jeff chung");
    var company2 = new Company("Astri2", "sss");
    //always remember that js function is complex data(so seperate)& executable
    expect(company1.info !== company2.info).toBe(true);
    expect("Astri").toBe(company1.name);

    //Disadvantage :no identical (share memory) for function
  });
  it("constructor pattern improvement", () => {
    function info() {
      LOGV(this.name + this.employee);
    }
    function Company(name, employee) {
      this.name = name;
      this.employee = employee;
      this.info = info;
    }
    var company1 = new Company("Astri", "jeff chung");
    var company2 = new Company("Astri2", "sss");
    //always remember that js function is complex data(so seperate)& executable
    //disadvantage :,two variable point to same function
    expect(company1.info === company2.info).toBe(true);
    expect("Astri").toBe(company1.name);
  });
  it("Constructor for variable& Prototype pattern for function", () => {
    function Company(name, employee) {
      this.name = name;
      this.employee = employee;
    }
    //every function have a common(share same memory)&predefined object property,Call **prototype**
    //if it is used as constructor,it will be the prototype of object
    Company.prototype.info = function() {
      LOGV(this.name + this.employee);
    };
    var company1 = new Company("Astri", "jeff chung");
    var company2 = new Company("Astri2", "sss");
    //every reference values created by reference type has a prototype variable for evaluation
    expect(company1.info === company2.info).toBe(true);
    expect("Astri").toBe(company1.name);
  });
  it("Constructor for variable& Prototype pattern for function&closure pattern for protected variable,closure created when constructor is called", () => {
    function Company(name, employee, id) {
      this.name = name;
      this.employee = employee;
      Company.prototype.info = function() {
        return this.name + this.employee + id;
      };
      Company.prototype.setId = function(newId) {
        if (newId == "#3") {
          id = "#specialId";
        } else {
          id = newId;
        }
      };
    }
    //every function have a common(share same memory)&predefined object property,Call **prototype**
    //if it is used as constructor,it will be the prototype of object

    var company1 = new Company("Astri", "jeff chung", "#1");
    var company2 = new Company("Astri2", "sss", "#2");
    //you cannot change the id of company,you are not manipulating the this plain object

    /**
     * in javascript,a complete object memory space is the this+it's related closure
     *
     */
    company1.id = "dd";
    //every reference values created by reference type has a prototype variable for evaluation
    expect(company1.info === company2.info).toBe(true);
    expect("Astri").toBe(company1.name);
    expect("Astrijeff chung#2").toBe(company1.info());
    company1.setId("#3");
    expect("Astrijeff chung#specialId").toBe(company1.info());

    /*
      hard to log the variable in closure space
    */
  });
  it("module pattern in object ,IIFE closure,closure created when function is created", () => {
    /*https://stackoverflow.com/questions/7471349/why-module-pattern*/
    var Company = (function() {
      var id = 22;
      function Company(name, employee, id) {
        this.name = name;
        this.employee = employee;
        Company.prototype.info = function() {
          return this.name + this.employee + id;
        };
        Company.prototype.setId = function(newId) {
          if (newId == "#3") {
            id = "#specialId";
          } else {
            id = newId;
          }
        };
      }
      return Company;
    })();

    var company1 = new Company("Astri", "jeff chung", "#1");
    var company2 = new Company("Astri2", "sss", "#2");
    //you cannot change the id of company,you are not manipulating the this plain object

    /**
     * in javascript,a complete object memory space is the this+it's related closure
     *
     */
    company1.id = "dd";
    //every reference values created by reference type has a prototype variable for evaluation
    expect(company1.info === company2.info).toBe(true);
    expect("Astri").toBe(company1.name);
    expect("Astrijeff chung#2").toBe(company1.info());
    company1.setId("#3");
    expect("Astrijeff chung#specialId").toBe(company1.info());
  });
  it("test-prototype-inheritance", () => {
    function Company(name, employee) {
      this.name = name;
      this.employee = employee;
    }
    Company.prototype.info = function() {
      LOGV(this.name + this.employee);
    };
    function GovernmentCompany(name, employee) {
      Company.call(this, name, employee);
      this.name = "government" + this.name;
      this.employee = "government" + this.employee;
    }
    //Object-create = special way to create prototype object with specific prototype of function,if it is assign to prototype of another function,then prototype inheriance chain create
    GovernmentCompany.prototype = Object.create(Company.prototype);

    GovernmentCompany.prototype.constructor = GovernmentCompany;
    //dynamic add method to close
    GovernmentCompany.prototype.close = function() {
      return false;
    };
    var company1 = new Company("Astri", "jeff chung");
    var company2 = new GovernmentCompany("Astri2", "sss");
    // same inheriance function template& same inheriance memory
    expect(company1.info === company2.info).toBe(true);

    expect("Astri").toBe(company1.name);
    expect("governmentAstri2").toBe(company2.name);
    expect(company1 instanceof Company).toBe(true);
    expect(company2 instanceof GovernmentCompany).toBe(true);
    expect(company2 instanceof Company).toBe(true);
    expect(company2.close()).toBe(false);
    var fakeCompany = {
      name: "fake ss"
    };
    expect(fakeCompany instanceof Company).toBe(false);
    Object.setPrototypeOf(fakeCompany, Company.prototype);
    expect(fakeCompany instanceof Company).toBe(true);
  });
});
describe("es6", () => {
  it("test-es-6-sugar", () => {
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
        this.name = "government" + this.name;
        this.employee = "government" + this.employee;
      }
    }
    class PrivateCompany extends Company {
      constructor(name, employee) {
        super(name, employee);
        this.name = "private" + this.name;
        this.employee = "private" + this.employee;
      }
    }
    var company1 = new Company("Astri", "jeff chung");
    var company2 = new GovernmentCompany("Astri2", "sss");
    var company3 = new PrivateCompany("Astri3", "eee");
    // same inheriance function template& same inheriance memory
    expect(
      company1.info === company2.info && company1.info === company3.info
    ).toBe(true);
    //
    expect("Astri").toBe(company1.name);
    expect("governmentAstri2").toBe(company2.name);
    expect(company1 instanceof Company).toBe(true);
    expect(company2 instanceof GovernmentCompany).toBe(true);
    expect(company2 instanceof Company).toBe(true);
    expect(company3 instanceof PrivateCompany).toBe(true);
    expect(company3 instanceof Company).toBe(true);
    // t.false(company2.close());
  });
  it("test-defensive-setter", () => {
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
        if (!fullName.includes(" ")) {
          throw new Error("fullName have no space");
        }
        this.givenName = fullName.split(" ")[0];
        this.sureName = fullName.split(" ")[1];
      }
      set age(age) {
        if (typeof age != "number") {
          throw new Error("age is not number");
        }
        this._age = age;
      }
      get age() {
        return this._age;
      }
    }
    let jeff = new Person("Jeff Chung");
    jeff.age = 12;
    expect(12).toBe(jeff.age);
    expect("Jeff").toBe(jeff.givenName);
    expect("Chung").toBe(jeff.sureName);
    try {
      let wrongName = new Person("JeffChung");
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
  it("test-getter-and-setter", () => {
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
        this.givenName = fullName.split(" ")[0];
        this.sureName = fullName.split(" ")[1];
      }
    }
    let jeff = new Person("jeff", "chung");
    expect("jeffchung").toBe(jeff.fullName);
    expect("jeff").toBe(jeff.givenName);
    expect("jeffchung").toBe(jeff.fullName);
    jeff.fullName = "Jeff Chung";
    expect("Jeff").toBe(jeff.givenName);
    expect("Chung").toBe(jeff.sureName);
  });
  it("test-object-deserializer", () => {
    let info = { sureName: "jeff", givenName: "chung" };
    //object spread used to create object
    let { sureName, givenName } = info;
    expect(sureName).toBe("jeff");
    expect(givenName).toBe("chung");
  });
  it("test-object-spread-to-create-object", () => {
    let info = { sureName: "jeff", givenName: "chung" };
    //object spread used to create object
    let jeff = { ...info, fullName: "jeffchung", sureName: "superjeff" };

    expect(jeff.givenName).toBe("chung");
    expect(jeff.sureName).toBe("superjeff");
    expect(jeff.fullName).toBe("jeffchung");
  });
});
