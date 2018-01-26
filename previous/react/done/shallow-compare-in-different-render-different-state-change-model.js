let _ = require('lodash');
import renderer from 'react-test-renderer';
import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import update from 'immutability-helper';
import ReactDOM from 'react-dom';
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
import PureRenderMixin from 'react-addons-pure-render-mixin';

//Shallow Equal
//Compare ref equalness first
//Compare object property first layer equalness
//if not object,compare value equalness
//https://github.com/facebook/fbjs/blob/0c03b9c3788eaf19ec19598a00f319a5f0d831f2/packages/fbjs/src/core/shallowEqual.js
//have the 1007  if we change ordersById.o1.total,
// when 6 if we change user.name
//
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
            console.log(objA[keysA[i]], ' not equal to old');
        } else {
            console.log(objA[keysA[i]], ' equal to old');
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
            user: this.props.app.user,
            ordersById: this.props.app.ordersById
        };
    }
    directChangeState() {
        this.state.ordersById.o1.total = 22;
        this.setState({
            ordersById: this.state.ordersById
        });
    }
    changeByReducerComposition() {
        let newObj = {
            ordersById: {
                ...this.state.ordersById,
                o1: {...this.state.ordersById.o1, total: 22}
            }
        };

        this.setState(newObj);
    }
    changeByUpdateHelper() {
        this.setState(update(this.state, {ordersById: {o2: {$set: 22}}}));
    }
    render() {
        return (
            <div>
                <User user={this.state.user} />-
                <Orders orders={_.values(this.state.ordersById)} />
            </div>
        );
    }
}
class User extends React.Component {
    render() {
        let {user} = this.props;
        return <div>{user.name}{user.age}</div>;
    }
}
class Order extends React.Component {
    render() {
        let {order} = this.props;
        return (
            <div>
                (id:{order.id} total:{order.total} itemCount:{order.itemCount})
            </div>
        );
    }
}
class Orders extends React.Component {
    render() {
        let {orders} = this.props;
        let ordersV = orders.map(order => (
            <Order key={order.id} order={order} />
        ));
        return <div>{ordersV}</div>;
    }
}
describe.only(
    'reducer composition succeed even if shouldComponentUpdate use shallow compare',
    () => {
        it.only(
            'renders correctly by reducer composition(create new object)',
            () => {
                var shouldComponentUpdate = function(newProps, newState) {
                    let should = !shallowEqual(this.props, newProps);
                    console.log(
                        'should',
                        should,
                        this.constructor.name,
                        this.props,
                        newProps
                    );
                    return should;
                };
                // App.prototype.shouldComponentUpdate = shouldComponentUpdate;
                User.prototype.shouldComponentUpdate = shouldComponentUpdate;
                Order.prototype.shouldComponentUpdate = shouldComponentUpdate;
                Orders.prototype.shouldComponentUpdate = shouldComponentUpdate;
                let app = {
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
                };
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
                appV.changeByReducerComposition();
                //
                expect(el.textContent).toBe(
                    'jeff20-(id:o1 total:22 itemCount:10)(id:o2 total:200 itemCount:2)'
                );
            }
        );
    }
);
describe('direct change fail if shouldComponentUpdate use shallow compare', () => {
    it('renders unsuccessfully due to shallow compare', () => {
        var shouldComponentUpdate = function(newProps, newState) {
            return !shallowEqual(this.props, newProps) ||
                !shallowEqual(this.state, newState);
        };
        App.prototype.shouldComponentUpdate = shouldComponentUpdate;
        User.prototype.shouldComponentUpdate = shouldComponentUpdate;
        Order.prototype.shouldComponentUpdate = shouldComponentUpdate;
        Orders.prototype.shouldComponentUpdate = shouldComponentUpdate;
        let app = {
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
        };
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
        appV.directChangeState();

        expect(el.textContent).toBe(
            'jeff20-(id:o1 total:500 itemCount:10)(id:o2 total:200 itemCount:2)'
        );
    });
});

describe('special case investigation', () => {
    it('Pure render mixin is just another shallow compare', () => {
        let app = {
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
        };
        const dom = new JSDOM(`<!DOCTYPE html>`);
        App.prototype.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
        User.prototype.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
        Order.prototype.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
        Orders.prototype.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
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
        appV.directChangeState();

        expect(el.textContent).toBe(
            'jeff20-(id:o1 total:500 itemCount:10)(id:o2 total:200 itemCount:2)'
        );
    });
    it('reducer composition still succeed when shallow compare even render from dom,vdom still can get old props', () => {
        var shouldComponentUpdate = function(newProps, newState) {
            return !shallowEqual(this.props, newProps) ||
                !shallowEqual(this.state, newState);
        };
        App.prototype.shouldComponentUpdate = shouldComponentUpdate;
        User.prototype.shouldComponentUpdate = shouldComponentUpdate;
        Order.prototype.shouldComponentUpdate = shouldComponentUpdate;
        Orders.prototype.shouldComponentUpdate = shouldComponentUpdate;
        let app = {
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
        };
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
        appV.changeByReducerComposition();

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
            'jeff20-(id:o1 total:22 itemCount:10)(id:o2 total:200 itemCount:2)'
        );
    });
});
