let _ = require('lodash');
describe('compose', () => {
    function conjoin(seagulls1, seagulls2) {
        return seagulls1 + seagulls2;
    }
    function breedOptimally(seagulls) {
        return seagulls * 1.5;
    }
    function breedBadDueToBadEnvironment(seagulls) {
        return seagulls + seagulls * 0.1;
    }
    it('seagull es5', () => {
        //https://note.pcwu.net/2017/03/10/compose-function/
        //10 + 5 => 15, 15*1.5^3 = 50.625
        //The function that create new function[Tunnel that create function]
        function conjoinAndBreedFor3Generation(conjoin, breed) {
            return function(seagulls1, seagulls2) {
                let seagulls = conjoin(seagulls1, seagulls2);
                for (let i = 0; i < 3; i++) {
                    seagulls = breed(seagulls);
                }
                return seagulls;
            };
        }
        //10 + 5 => 15, 15*1.1^3 = 19.965

        expect(
            conjoinAndBreedFor3Generation(conjoin, breedBadDueToBadEnvironment)(
                10,
                5
            )
        ).toBe(19.965);
    });
    it('seagull es6', () => {
        //10 + 5 => 15, 15*1.5^3 = 50.625
        //The function that create new function[Tunnel that create function]
        const conjoinAndBreedFor3Generation = (conjoin, breed) => (
            seagulls1,
            seagulls2
        ) => {
            let seagulls = conjoin(seagulls1, seagulls2);
            for (let i = 0; i < 3; i++) {
                seagulls = breed(seagulls);
            }
            return seagulls;
        };

        //10 + 5 => 15, 15*1.1^3 = 19.965

        expect(
            conjoinAndBreedFor3Generation(conjoin, breedBadDueToBadEnvironment)(
                10,
                5
            )
        ).toBe(19.965);
    });
});
