let _ = require('lodash');
//high function
//global
describe('array-native & lodash', () => {
  it('test-find', () => {
    let target = [1, 2, 3, 4, 5];
    expect(target.find(element => element == 5)).toBe(5);
    expect(target.find(element => element == 6)).toBe(undefined);
  });

  it('test-filter', () => {
    let target = [1, 2, 3, 4, 5];
    //1%2=1,3%2=1,5%2=1
    expect(target.filter(element => element % 2).length).toBe(3);
  });

  it('test-add', () => {
    let target = [1, 2, 3, 4, 5];
    //1%2=1,3%2=1,5%2=1
    let duplicatedTargets = target.map(element => element * 2);
    expect(Math.max(...duplicatedTargets)).toBe(10);
  });
  it('test-reduce', () => {
    let target = [1, 2, 3, 4, 5];
    //(1+5)*5/2=15
    let sum = target.reduce((acc, elementB) => acc + elementB, 0);
    expect(sum).toBe(15);
  });

  //checking
  it('test-include', () => {
    let target = [1, 2, 3, 4, 5];
    expect(target.includes(4)).toBe(true);
  });

  //pure functions
  it('test-slice', () => {
    let target = [1, 2, 3, 4, 5];
    //(1+5)*5/2=15
    let oneAndTwoArr = target.slice(0, 3);
    expect(oneAndTwoArr.length).toBe(3);
  });
  //pure functions
  it('test-without', () => {
    let target = [1, 2, 3, 4, 5];

    expect(_.without(target, 3).length).toBe(4);
    expect(target.length).toBe(5);
  });
  it('test-concat', () => {
    let target = [1, 2, 3, 4, 5];
    //(1+5)*5/2=15
    expect(target.concat([5, 6]).length).toBe(7);
  });

  //mutation function
  it('test-push', () => {
    //push is not a pure function !!
    let target = [1, 2, 3, 4, 5];
    target.push(5);
    target.push(7);
    expect(target.length).toBe(7);
  });
  //immutable push
  it('test-immutable-push', () => {
    //push is pure function !!
    let target = [1, 2, 3, 4, 5];

    expect([...target, [5]].length).toBe(6);
    expect(target.length).toBe(5);
  });
  it('test-toggle-existence', () => {
    let target = [1, 2, 3, 4, 5];
    let targetWithout5 = _.xor(target, [5]);
    expect(targetWithout5.length).toBe(4);
    // console.log(targetWithout5)
    expect(_.xor(targetWithout5, [5]).length).toBe(5);
  });
  it('test-chain', () => {
    var users = [
      {
        user: 'barney',
        age: 36,
      },
      {
        user: 'fred',
        age: 40,
      },
      {
        user: 'pebbles',
        age: 1,
      },
    ];
    //it is lodash map ,not array map!!
    let sortAscUserAges = _.chain(users)
      .sortBy('age')
      .map(object => {
        return object.age;
      })
      .value();
    expect(sortAscUserAges[0]).toBe(1);
    expect(sortAscUserAges[1]).toBe(36);
    expect(sortAscUserAges[2]).toBe(40);
  });
  it('test-key-by', () => {
    var users = [
      {
        user: 'barney',
        age: 36,
      },
      {
        user: 'fred',
        age: 40,
      },
      {
        user: 'pebbles',
        age: 1,
      },
    ];
    // console.log(_.keyBy(users,'user'));
    expect(_.keyBy(users, 'user').barney.age).toBe(36);
  });
  it('test-group-by-basic', () => {
    expect(
      Object.keys(_.groupBy(['one', 'two', 'three'], 'length')).length
    ).toBe(2);
  });
  function groupByPreservedKey(peoplesByName, groupByFunc) {
    let elementWithTempKeys = _.mapValues(peoplesByName, (object, key) => {
      object['tempKey'] = key;
      return object;
    });
    // groupByFunc.arguments
    let groupedElements = _.groupBy(elementWithTempKeys, groupByFunc);

    let groupedElementsByOriginalKey = _.mapValues(
      groupedElements,
      groupArr => {
        return _.keyBy(groupArr, 'tempKey');
      }
    );

    _.map(groupedElementsByOriginalKey, (object, key) => {
      _.map(
        groupedElementsByOriginalKey[key],
        element => delete element['tempKey']
      );
    });
    return groupedElementsByOriginalKey;
  }
  it('test-map-values', () => {
    //map values if a map to the values only,so it can preserve key if object collection
    var peoplesByName = {
      jeff: {
        age: 1,
        id: 'name1',
      },
      mandy: {
        age: 3,
        id: 'name2',
      },
      shavon: {
        age: 3,
        id: 'name3',
      },
      grandma: {
        age: 65,
        id: 'name4',
      },
    };
    var combinatedResult = _.mapValues(peoplesByName, people => {
      //copy a people variable
      people.combination = people.age + people.id;
      return people;
    });
    expect(combinatedResult.jeff.combination).toBe('1name1');
  });

  it('test-group-by', () => {
    let periods = {
      t0000: false,
      t0100: false,
      t0200: false,
      t0300: false,
      t0400: false,
      t0500: false,
      t0600: false,
      t0700: false,
      t0800: false,
      t0900: false,
      t1000: false,
      t1100: false,
      t1200: false,
      t1300: false,
      t1400: false,
      t1500: false,
      t1600: false,
      t1700: false,
      t1800: false,
      t1900: false,
      t2000: false,
      t2100: false,
      t2200: false,
      t2300: false,
    };
    var peoplesByName = {
      jeff: {
        age: 1,
        id: 'name1',
      },
      mandy: {
        age: 3,
        id: 'name2',
      },
      shavon: {
        age: 3,
        id: 'name3',
      },
      grandma: {
        age: 65,
        id: 'name4',
      },
    };

    let groupedPeople = groupByPreservedKey(peoplesByName, object => {
      if (object.tempKey == 'jeff') {
        return 'weird';
      }
      if (object.age < 35) {
        return 'young';
      }
      return 'old';
    });
    // console.log(groupedPeople);
    expect(Object.keys(groupedPeople).length).toBe(3);
    // console.log(groupedPeople);
    // let groupedPeriod = groupByPreservedKey(periods,(period)=>{
    //   console.log(period);
    //   if(period.tempKey=='t2300'){
    //     return 'morning';
    //
    //   }else{
    //     return 'afternoon';
    //
    //   }
    // });
    // console.log(groupedPeriod);
  });
  it('test chain', () => {
    const mediasById = {
      image1: {
        id: 'image1',
        name: 'my-test-image 1',
        updated: new Date(),
      },
      image2: {
        id: 'image2',
        name: 'my-test-image 2',
        updated: new Date(),
      },
      video1: {
        id: 'video1',
        name: 'my-test-video 1',
        updated: new Date(),
      },
      video2: {
        id: 'video2',
        name: 'my-test-video 2',
        updated: new Date(),
      },
    };
    let result = _(mediasById)
      .filter(media => media.name.includes('image'))
      .sortBy(['created'])
      .reverse()
      .value();
    expect(result[0].name).toBe('my-test-image 2');
    expect(result[1].name).toBe('my-test-image 1');
    expect(result.length).toBe(2);
  });
});
