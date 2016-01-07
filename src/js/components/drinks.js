import React, {Component} from 'react';

class Drinks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produits: []
        };

        props.productsDb.createIndex({
            index: {fields: ['restaurant', 'type']}
        }).then(_ => {
                return props.productsDb.find({
                    selector: {
                        restaurant: '37b8fba54547f759470dc35eb9000ac6',
                        type: 'drink'
                    }
                });
            })
            .then(res => {
                this.setState({
                    produits: res.docs
                })
            })
    }

    render() {
        const produits = this.state.produits.map(doc => {
            return <li key={doc._id}> {doc.name}</li>;
        });
        return (<div>
            <ul>
                {produits}
            </ul>
        </div>);
    }
}

export default Drinks;

