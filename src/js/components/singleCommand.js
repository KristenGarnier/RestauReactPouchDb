import React, {Component} from 'react';

class SingleCommand extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            principal: {},
            drink: {},
            supplements: [],
            price: 0,
            date: ''
        };

        this.props.localDb.createIndex({
                index: {fields: ['_id']}
            })
            .then(_ => {
                return this.props.localDb.find({
                    selector: {
                        _id: this.props.params.id
                    }
                });
            })
            .then(res => {
                this.setState({
                    user: res.docs[0].user,
                    drink: res.docs[0].elems.drink,
                    principal: res.docs[0].elems.principal,
                    supplements: res.docs[0].elems.supplements,
                    price: res.docs[0].price,
                    date: res.docs[0].date
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const elems = this.state.supplements.map((supp, i) => {
            return <tr key={i}>
                <td>{supp.name}</td>
                <td>Supplément</td>
                <td>{supp.price}</td>
            </tr>;
        });
        return (<div>
            <h3>Auteur de la commande : {this.state.user.name}</h3>
            <h4 className="u-pull-right" style={{
                marginRight: '4rem'
            }}> date : {this.state.date}</h4>
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
                {elems}
                </tbody>
            </table>
            <h4>Prix total : {this.state.price} €</h4>
        </div>);
    }
}

export default SingleCommand;
