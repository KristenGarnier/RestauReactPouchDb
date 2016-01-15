import React, {Component} from 'react';
import moment from 'moment';
import _ from 'ramda';
import {countElems, getElems} from '../utilis';

class Call extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            commands: []
        };

        this.props.localDb.createIndex({
                index: {fields: ['date']}
            })
            .then(_ => {
                return this.props.localDb.find({
                    selector: {
                        date: moment().format('D-MM-Y')
                    }
                });
            })
            .then(res => {
                this.setState({
                    commands: res.docs
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const f = _.compose(countElems, getElems);
        console.log(f(this.state.commands, 'supplements'));
        const sup = f(this.state.commands, 'supplements').map((el, i) => {
            return <tr key={i}>
                <td>{el.name}</td>
                <td>{el.count}</td>
            </tr>
        });
        const boissons = f(this.state.commands, 'drink').map((el, i) => {
            return <tr key={i}>
                <td>{el.name}</td>
                <td>{el.count}</td>
            </tr>
        });

        const mains = f(this.state.commands, 'principal').map((el, i) => {
            return <tr key={i}>
                <td>{el.name}</td>
                <td>{el.count}</td>
            </tr>
        });

        return (
            <div>
                <button onClick={this.handleClick} className="button-primary">Retour aux commandes</button>
                <h2>Produits principaux</h2>
                <table className="u-full-width">
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mains}
                    </tbody>
                </table>

                <h2>Boissons</h2>
                <table className="u-full-width">
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boissons}
                    </tbody>
                </table>

                <h2>Suppléments</h2>
                <table className="u-full-width">
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sup}
                    </tbody>
                </table>
            </div>
        );
    }

    handleClick(){
        this.props.history.goBack();
    }
}

export default Call;
