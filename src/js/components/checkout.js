import React, {Component} from 'react';
import {reset, deleteSupplement} from '../actions';
import TableRow from './tableRow';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleAction = this.handleAction.bind(this);

        const store = this.props.store.getState();
        this.state = {
            principal: store['principal'] || {},
            drink: store['drink'] || {},
            supplements: store['supplements'] || []
        };

        this.push = this.props.history.push;
    }

    componentWillMount() {

        this.unsubscibe = this.props.store.subscribe(() => {
            const state = this.props.store.getState();
            this.setState({
                supplements: state['supplements'],
                principal: state['principal'],
                drink: state['drink']
            });

        });
    }

    componentDidMount() {
        const store = this.props.store.getState(),
            restaurant = store['restaurant'],
            principal = store['principal'],
            supplements = store['supplements'],
            drink = store['drink'];

        if (restaurant === undefined || null) {
            this.push('/resume');
        }
        else if (principal === undefined || null) {
            this.push('/resume/product');
        }
        else if (drink === undefined || null) {
            this.push('/resume/drink');
        }
    }

    componentWillUnmount() {
        this.unsubscibe();
    }

    render() {
        let total = this.state.principal.price + this.state.drink.price;
        const supplements = this.state.supplements.map((supp, i) => {
            total += supp.price;
            return <TableRow element={supp} key={i} click={this.handleAction} />;
        });

        return <div>
            <table className="u-full-width">
                <thead>
                <tr>
                    <th>Produit</th>
                    <th>type</th>
                    <th>prix</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{this.state.principal.name}</td>
                    <td>Element Principal</td>
                    <td>{this.state.principal.price}</td>
                    <td><button onClick={() => this.handleAction('MODIFY_PRINCIPAL')}>Modifer</button></td>
                </tr>
                <tr>
                    <td>{this.state.drink.name}</td>
                    <td>Boisson</td>
                    <td>{this.state.drink.price}</td>
                    <td><button onClick={() => this.handleAction('MODIFY_DRINK')}>Modifier</button></td>
                </tr>
                {supplements}
                </tbody>
            </table>
            <div>
                <h3>TOTAL : {total} €</h3>
                <button className="button-primary" onClick={this.handleCheckout}>Commander</button>
            </div>
        </div>;
    }

    handleCheckout(){
        this.props.history.push('/');
        this.props.store.dispatch(reset());
    }

    handleAction(action, supplement){
        switch(action){
            case 'DELETE':
                this.props.store.dispatch(deleteSupplement(supplement));
                break;
            case 'MODIFY_PRINCIPAL':
                this.push('/resume/product');
                break;
            case 'MODIFY_DRINK':
                this.push('/resume/drink');
                break;
            default:
                console.error('Wrong action sent to handleAction');
                break;
        }
    }
}

export default Checkout;
