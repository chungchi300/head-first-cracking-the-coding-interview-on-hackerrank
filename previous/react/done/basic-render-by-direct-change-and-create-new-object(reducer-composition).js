let _ = require('lodash');
import renderer from 'react-test-renderer';
import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
//high function
//global
import PureRenderMixin from 'react-addons-pure-render-mixin';
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
        this.forceUpdate();
    }
    changeByReducerComposition() {
        this.state = {
            user: this.state.user,
            ordersById: {
                o1: {...this.state.ordersById.o1, total: 22},
                o2: this.state.ordersById.o2
            }
        };
        this.forceUpdate();
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
describe('direct change on state', () => {
    it('renders correctly', () => {
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
        //completely re render  virtual dom
        ReactDOM.render(<App app={app} />, el);

        expect(el.textContent).toBe(
            'jeff20-(id:o1 total:500 itemCount:10)(id:o2 total:200 itemCount:2)'
        );
    });
    it('renders correctly even direct change state', () => {
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
            'jeff20-(id:o1 total:22 itemCount:10)(id:o2 total:200 itemCount:2)'
        );
    });
    it('renders correctly by reducer composition(create new object)', () => {
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

        expect(el.textContent).toBe(
            'jeff20-(id:o1 total:22 itemCount:10)(id:o2 total:200 itemCount:2)'
        );
    });
});
