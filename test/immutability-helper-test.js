import update from 'immutability-helper';
describe('immutability-helper', () => {
    it('test-push', () => {
        const teenAges = [18, 19, 20, 21];
        //immutability!
        expect(teenAges.length).toBe(4);
        expect(update(teenAges, {$push: [22]}).length).toBe(5);
        expect(teenAges.length).toBe(4);
    });
    it('test-nested-push', () => {
        const teenAges = [18, 19, 20, 21];
        const ageRanges = {young: teenAges, old: [50, 51, 52]};
        expect(teenAges.length).toBe(4);
        const newAgeRanges = update(ageRanges, {young: {$push: [22]}});
        //immutability!
        expect(teenAges.length).toBe(4);
        expect(newAgeRanges.young.length).toBe(5);
    });
    it('testRemoveAndInsert', () => {
        const teenAges = [18, 19, 50, 22, 23];
        expect(teenAges.length).toBe(5);
        const correctAges = update(teenAges, {$splice: [[2, 1, 20, 21]]});
        expect(correctAges.includes(18)).toBe(true);
        expect(correctAges.includes(19)).toBe(true);
        expect(correctAges.includes(20)).toBe(true);
        expect(correctAges.includes(21)).toBe(true);
        expect(correctAges.includes(22)).toBe(true);
        expect(correctAges.includes(23)).toBe(true);
        expect(correctAges.includes(50)).toBe(false);
    });
    it('testNestedRemoveAndInsert', () => {
        const teenAges = [18, 19, 50, 22, 23];

        const ageRanges = {young: teenAges, old: [50, 51, 52]};
        expect(ageRanges.young.length).toBe(5);
        const correctAgeRanges = update(ageRanges, {
            young: {$splice: [[2, 1, 20, 21]]}
        });
        //immutability !
        expect(teenAges.includes(50)).toBe(true);
        expect(correctAgeRanges.young.includes(18)).toBe(true);
        expect(correctAgeRanges.young.includes(19)).toBe(true);
        expect(correctAgeRanges.young.includes(20)).toBe(true);
        expect(correctAgeRanges.young.includes(21)).toBe(true);
        expect(correctAgeRanges.young.includes(22)).toBe(true);
        expect(correctAgeRanges.young.includes(23)).toBe(true);
        expect(correctAgeRanges.young.includes(50)).toBe(false);
    });
    it('test-nested-updated', () => {
        const teenAges = [18, 19, 50, 22, 23];

        const ageRanges = {young: teenAges, old: [50, 51, 52]};
        //immutability!
        //array position as index
        let correctAgeRanges = update(ageRanges, {young: {2: {$set: 20}}});

        expect(correctAgeRanges.young.includes(50)).toBe(false);

        expect(ageRanges.young.includes(50)).toBe(true);
    });
    it('test-nested-double-updated', () => {
        const teenAges = [18, 19, 50, 22, 23];

        const ageRanges = {young: teenAges, old: [50, 51, 52]};
        //immutability!
        //array position as index
        let correctAgeRanges = update(ageRanges, {
            young: {2: {$apply: x => x / 2}}
        });
        expect(correctAgeRanges.young.includes(25)).toBe(true);
    });
    it('test-nested-merge', () => {
        const teenAges = [18, 19, 50, 23, 24];

        const ageRanges = {young: teenAges, old: [25, 51, 52]};
        //immutability!
        //array position as index
        let correctAgeRanges = update(ageRanges, {
            young: {$merge: [20, 21, 22]}
        });
        //merge is for collection syntax,array position as index
        expect(correctAgeRanges.young.includes(20)).toBe(true);
        expect(correctAgeRanges.young.includes(21)).toBe(true);
        expect(correctAgeRanges.young.includes(22)).toBe(true);
        expect(correctAgeRanges.young.includes(23)).toBe(true);
        expect(correctAgeRanges.young.includes(24)).toBe(true);

        const obj = {a: 5, b: 3};
        const newObj = update(obj, {$merge: {b: 6, c: 7}}); // => {a: 5, b: 6, c: 7}
        expect(Object.values(newObj).includes(5));
        expect(Object.values(newObj).includes(6));
        expect(Object.values(newObj).includes(7));
    });
});
