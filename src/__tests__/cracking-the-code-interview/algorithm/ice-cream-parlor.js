process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = '';
var input_stdin_array = '';
var input_currentline = 0;

process.stdin.on('data', function(data) {
    input_stdin += data;
});

process.stdin.on('end', function() {
    input_stdin_array = input_stdin.split('\n');
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
class FlavourCombination {
    constructor(flavour1Name, flavour2Name) {
        this.lowerCostFlavour = Math.min(flavour1Name, flavour2Name);
        this.higherCostFlavour = Math.max(flavour1Name, flavour2Name);
    }
}
function findPairFlavours(complementCostOfFlavour, unmatchedFlavours) {
    return unmatchedFlavours[complementCostOfFlavour];
}
//Classical two sum application
function solve(flavours, money) {
    // Complete this function

    var unmatchedFlavours = {};
    for (let i = 0; i < flavours.length; i++) {
        const complement = money - flavours[i];

        if (findPairFlavours(complement, unmatchedFlavours) != undefined) {
            return new FlavourCombination(
                i + 1,
                unmatchedFlavours[complement] + 1
            );
        } else {
            //store the location
            unmatchedFlavours[flavours[i]] = i;
        }
    }
}
describe('All', () => {
    it('Full question', () => {
        var money = 4;
        var flavours = [1, 4, 5, 3, 2];
        let suitableFlavour = solve(flavours, money);
        expect(suitableFlavour.lowerCostFlavour).toBe(1);
        expect(suitableFlavour.higherCostFlavour).toBe(4);
    });
});
