import React, {Component} from 'react';
import {reset, deleteSupplement} from '../actions';
import TableRow from './tableRow';
import uuid from 'node-uuid';
import moment from 'moment';
import {countElems} from '../utilis';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleAction = this.handleAction.bind(this);

        const store = this.props.store.getState();
        this.state = {
            principal: store['principal'] || {},
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

    componentWillUnmount() {
        this.unsubscibe();
    }

    render() {
        let total = this.state.principal.price + this.state.drink.price;
        const supplements = countElems(this.state.supplements).map((supp, i) => {
            total += supp.price;
            return <TableRow element={supp} key={i} click={this.handleAction}/>;
        });

        return <div>
            <table className="u-full-width">
                <thead>
                <tr>
                    <th>Produit</th>
                    <th>type</th>
                    <th>prix</th>
                    <th>Quantité</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { this.state.principal.name !== undefined ?
                    <tr>
                        <td>{this.state.principal.name}</td>
                        <td>Element Principal</td>
                        <td>{this.state.principal.price}</td>
                        <td>1</td>
                        <td>
                            <button onClick={() => this.handleAction('MODIFY_PRINCIPAL')}>Modifer</button>
                        </td>
                    </tr>
                    : ''}
                { this.state.drink.name !== undefined ?
                    <tr>
                        <td>{this.state.drink.name}</td>
                        <td>Boisson</td>
                        <td>{this.state.drink.price}</td>
                        <td>1</td>
                        <td>
                            <button onClick={() => this.handleAction('MODIFY_DRINK')}>Modifier</button>
                        </td>
                    </tr>
                    : ''}
                {supplements}
                </tbody>
            </table>
            { !isNaN(total) ?
                <div>
                    <h3>TOTAL : {total} €</h3>
                    <button className="button-primary" onClick={() => this.handleCheckout(total)}>Commander</button>

                </div>
                :
                <div>
                    <h3>Les articles choisis apparaitrons ici</h3>
                </div>}
        </div>;
    }

    handleCheckout(total) {
        const command = {
            _id: uuid.v1(),
            user: this.props.user,
            date: moment().format('D-MM-Y'),
            price: total,
            elems: this.state,
            restaurant: this.props.store.getState()['restaurant']
        };
        console.log(command);
        this.props.localDb.put(command)
            .then(_ => {

            })
            .catch(err => {
                console.error(err);
            });
        this.props.history.push('/');
        this.props.store.dispatch(reset());
    }

    handleAction(action, supplement) {
        switch (action) {
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
