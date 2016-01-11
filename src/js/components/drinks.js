import React, {Component} from 'react';
import {instantiateDrink} from '../actions';
import UiElem from './uiElem';

class Drinks extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            produits: [],
            state : this.props.store.getState()['drink'] || {}
        };

        props.productsDb.createIndex({
                index: {fields: ['restaurant', 'type']}
            })
            .then(_ => {
                return props.productsDb.find({
                    selector: {
                        restaurant: this.props.store.getState()['restaurant']._id,
                        type: 'drink'
                    }
                });
            })
            .then(res => {
                this.setState({
                    produits: res.docs
                })
            })
            .catch( err => {
                console.error(err);
            });

        this.push = this.props.history.push;
    }

    componentWillMount() {
        this.unsubscibe = this.props.store.subscribe(() => {
            this.setState({
                state: this.props.store.getState()['drink']
            });

        });
    }

    componentDidMount() {
        const store = this.props.store.getState(),
            restaurant = store['restaurant'],
            principal = store['principal'];

        if (restaurant === undefined || null) {
            this.push('/resume/restaurant');
        }
        else if (principal === undefined || null) {
            this.push('/resume/product');
        }
    }

    componentWillUnmount() {
        this.unsubscibe();
    }

    render() {
        const produits = this.state.produits.map(doc => {
            return <UiElem click={this.handleClick} selected={this.state.state} key={doc._id} element={doc}/>;
        });
        return (<div>
            <div className="row">
                {produits}
            </div>
        </div>);
    }

    handleClick(drink) {
        this.props.store.dispatch(instantiateDrink(drink));
        this.push('/resume/supplement');
    }
}

export default Drinks;

