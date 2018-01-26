const {Map, fromJS, toJS} = require('immutable');
import renderer from 'react-test-renderer';
import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import update from 'immutability-helper';
import ReactDOM from 'react-dom';
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
import PureRenderMixin from 'react-addons-pure-render-mixin';

const hasOwnProperty = Object.prototype.hasOwnProperty;
function is(x, y) {
    // SameValue algorithm

    if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        // Added the nonzero y check to make Flow happy, but it is redundant
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }
}
function shallowEqual(objA, objB) {
    console.log('shallowEqual', objA, objB);
    if (is(objA, objB)) {
        console.log('lazying', objA, objB);
        return true;
    }

    if (
        typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null
    ) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    for (let i = 0; i < keysA.length; i++) {
        if (
            !hasOwnProperty.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysA[i]])
        ) {
            console.log(objA[keysA[i]] + ' not equal to old');
        } else {
            console.log(objA[keysA[i]] + ' equal to old');
        }
        if (
            !hasOwnProperty.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysA[i]])
        ) {
            return false;
        }
    }
    return true;
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            app: this.props.app
        };
    }
    changeByImutableJs() {
        this.setState({
            app: this.state.app.setIn(['ordersById', 'o1', 'total'], 22)
        });
    }
    render() {
        return (
            <div>
                <User user={this.state.app.get('user')} />-
                <Orders ordersById={this.state.app.get('ordersById')} />
            </div>
        );
    }
}
class User extends React.Component {
    render() {
        let {user} = this.props;
        return <div>{user.get('name')}{user.get('age')}</div>;
    }
}
class Order extends React.Component {
    render() {
        let {order} = this.props;
        return (
            <div>
                (id:
                {order.get('id')}
                {' '}
                total:
                {order.get('total')}
                {' '}
                itemCount:
                {order.get('itemCount')}
                )
            </div>
        );
    }
}
class Orders extends React.Component {
    render() {
        let ordersV = this.props.ordersById.map(order => (
            <Order key={order.id} order={order} />
        ));
        return <div>{ordersV}</div>;
    }
}
describe('immutable js ', () => {
    it('can use direct compare in shouldComponent update', () => {
        var shouldComponentUpdate = function(newProps, newState) {
            let isShouldComponentUpdated = !(this.props === newProps) ||
                !(this.state === newState);
            // console.log(
            //     'is  equal',
            //     !isShouldComponentUpdated,
            //     this.constructor.name,
            //     this.props,
            //     newProps
            // );

            // return isShouldComponentUpdated;
            return !(this.props === newProps) || !(this.state === newState);
        };
        App.prototype.shouldComponentUpdate = shouldComponentUpdate;
        User.prototype.shouldComponentUpdate = shouldComponentUpdate;
        Order.prototype.shouldComponentUpdate = shouldComponentUpdate;
        Orders.prototype.shouldComponentUpdate = shouldComponentUpdate;
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
        const dom = new JSDOM(`<!DOCTYPE html>`);

        var el = document.createElement('div');
        //completely re\
        let appV;
        ReactDOM.render(
            <App
                ref={appR => {
                    appV = appR;
                }}
                app={app}
            />,
            el
        );
        expect(el.textContent).toBe(
            'jeff20-(id:o1 total:500 itemCount:10)(id:o2 total:200 itemCount:2)'
        );
        appV.changeByImutableJs();

        expect(el.textContent).toBe(
            'jeff20-(id:o1 total:22 itemCount:10)(id:o2 total:200 itemCount:2)'
        );
    });
});
