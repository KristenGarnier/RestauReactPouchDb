import React, {Component} from 'react';
import { connect } from 'react-redux'
import {instantiateRestaurant} from '../actions';
import UiElem from './uiElem';

class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            state: this.props.store.getState()['restaurant'] || {}
        };

        props.restaurantsDb.allDocs({include_docs: true})
            .then(res => {
                this.setState({
                    restaurants: res.rows
                });
            });

        this.handleClick = this.handleClick.bind(this);

        this.push = this.props.history.push;
    }

    componentWillMount() {
        this.unsubscibe = this.props.store.subscribe(() => {
            this.setState({
                state: this.props.store.getState()['restaurant']
            });

        });
    }

    componentWillUnmount() {
        this.unsubscibe();
    }

    render() {
        const restaurants = this.state.restaurants.map(doc => {
            return <UiElem click={this.handleClick} selected={this.state.state} key={doc.doc._id} element={doc.doc}/>;
        });
        return (<div>
            <h2>Choisissez votre restaurant</h2>
            <div className="row">
                {restaurants}
            </div>
        </div>);
    }

    handleClick(restaurant) {
        this.props.store.dispatch(instantiateRestaurant(restaurant));
        this.push('/resume/product');
    }
}

export default Restaurants;
