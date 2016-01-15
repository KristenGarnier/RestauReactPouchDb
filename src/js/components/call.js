import React, {Component} from 'react';
import moment from 'moment';
import _ from 'ramda';

class Call extends Component {
    constructor(props) {
        super(props);

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
        const f = _.compose(this.countElems, this.getElems);

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

    countElems(supplemements) {
        return _.flatten(supplemements).reduce((container, element) => {

            const temp = container.filter(e => {
                console.log(e.id, element._id.toString());
                return e.id === element._id.toString();
            });

            if (temp.length > 0) {
                return container.map(e => {
                    if (e.id === element._id.toString()) {
                        return Object.assign(e, {
                            count: e.count + 1
                        });
                    }
                    return e;
                });
            } else {
                const newObj = {
                    id: element._id.toString(),
                    name: element.name,
                    count: 1
                };

                return [
                    ...container,
                    newObj];
            }
        }, []);
    }

    getElems(state, cat){
        return state.map(elem => {
            return elem.elems[cat];
        });
    }
}

export default Call;
