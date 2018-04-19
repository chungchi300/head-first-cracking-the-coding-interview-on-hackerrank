function putPair(pairMap, complement, num) {
    let smallerNum = Math.min(complement, num);
    /*
        [1,46],[46,1] , they have similar common property that they have similar elements, we can use smallerNum as
    **unique pair identifyer** to remove duplication when addition

        {
            //Key as the smaller value
            1:46,
            even when 46,1 => add to map ,the smaller always on left to rewrite the logic
        }
    Utilize the map rewrite
    */
    let resultPairMap = { ...pairMap, [smallerNum]: Math.max(complement, num) };
    return resultPairMap;
}
function getDistinctPair(nums, total) {
    /*

        1=>[1,]
        2=>[1,2]
        3=>[1,2,3]
        46=>[1,2,3,46]
        50=>[1,2,3,46,50]
        100=>[1,2,3,46,50,100]
        1=>[1,2,3,46,50,100,1]

        */
    let unMatched = [];
    let pairMap = {};
    for (let num of nums) {
        let complement = total - num;
        if (complement in unMatched) {
            pairMap = putPair(pairMap, complement, num);
        } else {
            unMatched.push(num);
        }
    }

    return Object.keys(pairMap).length;
}
describe('Get Distinct Pair', () => {
    it('basic', () => {
        //47 ,  1,2,3,46,50,100,1,      should only have 1 pair as combination(1,46), of a value
        expect(getDistinctPair([1, 2, 3, 46, 50, 100, 1], 47)).toBe(1);
    });
});
