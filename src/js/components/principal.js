import React, {Component} from 'react';
import {instantiatePrincipal} from '../actions';
import UiElem from './uiElem';


class Principal extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            produits: [],
            state: this.props.store.getState()['principal'] || {}
        };

        props.productsDb.createIndex({
                index: {fields: ['restaurant', 'type']}
            })
            .then(_ => {
                return props.productsDb.find({
                    selector: {
                        restaurant: this.props.store.getState()['restaurant']._id,
                        type: 'principal'
                    }
                });
            })
            .then(res => {
                this.setState({
                    produits: res.docs
                })
            })
            .catch(err => {
                console.log(err);
            });

        this.push = this.props.history.push;
    }

    componentWillMount() {
        this.unsubscibe = this.props.store.subscribe(() => {
            this.setState({
                state: this.props.store.getState()['principal']
            });

        });
    }

    componentDidMount() {
        const restaurant = this.props.store.getState()['restaurant'];
        if (restaurant === undefined || null) {
            this.push('/resume/restaurant');
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

    handleClick(principal) {
        this.props.store.dispatch(instantiatePrincipal(principal));
        this.push('/resume/drink');
    }
}

export default Principal;
