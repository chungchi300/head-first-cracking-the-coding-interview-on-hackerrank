/*
 * Complete the countDuplicates function below.
 */
function countDuplicates(numbers) {
    /*
    false for existence
    true for duplication
        numberMap {
          1:true,
          3:true,
          4:false,
          5:false,
          6:false,
          2:false
        }
    */
    function getNumberMap(numbers) {
        let numberMap = {};
        for (let number of numbers) {
            if (number in numberMap) {
                numberMap[number] = true;
            } else {
                numberMap[number] = false;
            }
        }
        //console.log('numberMap',numberMap);
        return numberMap;
    }
    function getDuplicate(numberMap) {
        let duplicateNo = 0;
        for (let duplicate of Object.values(numberMap)) {
            if (duplicate) {
                duplicateNo++;
            }
        }
        return duplicateNo;
    }
    let numberMap = getNumberMap(numbers);

    return getDuplicate(numberMap);
}
describe('Count Duplicate', () => {
    it('basic', () => {
        expect(countDuplicates([1, 2, 3, 4, 5, 6, 3, 5])).toBe(2);
    });
});
