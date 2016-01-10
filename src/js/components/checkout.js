import React, {Component} from 'react';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
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
        } else if (supplements === undefined || null){
            this.push('/resume/supplement');
        }
    }

    componentWillUnmount() {
        this.unsubscibe();
    }

    render() {
        const supplements = this.state.supplements.map(supp => {
            return <tr>
                <td>{supp.name}</td>
                <td>Produit supplémentaire</td>
                <td>{supp.price}</td>
            </tr>;
        });
        return <div>
            <table className="u-full-width">
                <thead>
                <tr>
                    <th>Produit</th>
                    <th>type</th>
                    <th>prix</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{this.state.principal.name}</td>
                    <td>Element Principal</td>
                    <td>{this.state.principal.price}</td>
                </tr>
                <tr>
                    <td>{this.state.drink.name}</td>
                    <td>Boisson</td>
                    <td>{this.state.drink.price}</td>
                </tr>
                {supplements}
                </tbody>
            </table>
        </div>;
    }
}

export default Checkout;
