const {Map, fromJS} = require('immutable');
import PureRenderMixin from 'react-addons-pure-render-mixin';
describe('basic', () => {
    it('the model of immutable js', () => {
        //very special object,but the object reference model still don't change
        //because the assigning != normal map.b = 2,
        //it create entire new object with smart sharing
        const map1 = Map({a: 1, b: 2, c: 3});
        expect(map1.b).toBe(undefined);
        expect(map1.get('b')).toBe(2);
        const map2 = map1.set('b', 50);
        expect(map2.get('b')).toBe(50);
        //sharing
        expect(map2.get('a')).toBe(1);
        //immutability
        expect(map1.get('b')).toBe(2);
        //creating a new obj ref,so the obj ref not equal
        expect(map1 === map2).toBe(false);
    });
    it('immutable js compare elements by values,not obj ref', () => {
        const map1 = Map({a: 1, b: 2, c: 3});
        const map2 = map1.set('b', 50);
        const map3 = map2.set('b', 2);
        expect(map1.equals(map2)).toBe(false);
        expect(map1.equals(map3)).toBe(true);
    });
    it('from js is nested conversion', () => {
        const app = fromJS({
            user: {
                name: 'jeff',
                age: 20
            },
            ordersById: {
                o1: {
                    id: 'o1',
                    total: 500,
                    itemCount: 10
                },
                o2: {
                    id: 'o2',
                    total: 200,
                    itemCount: 2
                }
            }
        });
        let app2 = app.setIn(['user', 'name'], 'jeffrey');

        expect(app.getIn(['user', 'name'])).toBe('jeff');
        expect(app2.getIn(['user', 'name'])).toBe('jeffrey');
    });
    it('map is shallow convertion', () => {
        const app = Map({
            user: {
                name: 'jeff',
                age: 20
            },
            ordersById: {
                o1: {
                    id: 'o1',
                    total: 500,
                    itemCount: 10
                },
                o2: {
                    id: 'o2',
                    total: 200,
                    itemCount: 2
                }
            }
        });
        // console.log(app);
        let user = app.get('user');
        // console.log(user);
        expect(user.name).toBe('jeff');
        user.name = 'jeffrey';
        expect(user.name).toBe('jeffrey');
        //no longer have immutability
        expect(app.get('user').name).toBe('jeffrey');
        //Best practice , all immutable tree ,don't mix
    });
});
