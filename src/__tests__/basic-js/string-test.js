let _ = require('lodash');
//high function
//global
describe('array-native & lodash', () => {
    it('regexMatchResult', () => {
        // let emissions = _.range(0, 255).map(num => '' + num);
        let result = /^(.+)S_BY_ID$/.exec('DIMENSIONS_BY_ID');
        expect(result.length).toBe(2);
        expect(result[0]).toBe('DIMENSIONS_BY_ID');
        expect(result[1]).toBe('DIMENSION');
    });
    it('regexNonMatchResult', () => {
        // let emissions = _.range(0, 255).map(num => '' + num);
        let result = /^(.+)S_BY_ID$/.exec('DIMENSIONBY_ID');
        expect(result).toBe(null);
    });
});
