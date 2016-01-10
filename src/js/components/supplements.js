import React, {Component} from 'react';
import {addSupplement, deleteSupplement} from '../actions';
import UiElem from './uiElem';

class Supplements extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.delete = this.delete.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            produits: [],
            state: this.props.store.getState()['supplements'] || []
        };

        props.productsDb.createIndex({
                index: {fields: ['restaurant']}
            })
            .then(_ => {
                return props.productsDb.find({
                    selector: {
                        restaurant: this.props.store.getState()['restaurant']._id
                    }
                });
            })
            .then(res => {
                this.setState({
                    produits: res.docs
                })
            })
            .catch(err => {
                console.error(err);
            });

        this.push = this.props.history.push;
    }

    componentWillMount() {
        this.unsubscibe = this.props.store.subscribe(() => {
            this.setState({
                state: this.props.store.getState()['supplements']
            });

        });
    }

    componentDidMount() {
        const store = this.props.store.getState(),
            restaurant = store['restaurant'],
            principal = store['principal'],
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
        const produits = this.state.produits.map(doc => {
            return <UiElem click={this.handleClick} del={this.delete} selected={this.state.state} key={doc._id} element={doc}/>;
        });
        return (<div>
            <div className="row">
                {produits}
            </div>
            <button className="button-primary" onClick={this.handleConfirm}>Confirmer les suppléments</button>
        </div>);
    }

    handleClick(supplement) {
        this.props.store.dispatch(addSupplement(supplement));
    }

    handleConfirm(){
        this.push('/resume/checkout');
    }

    delete(supplement){
        this.props.store.dispatch(deleteSupplement(supplement));
    }
}

export default Supplements;

