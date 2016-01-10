import React, {Component} from 'react';
import {instantiatePrincipal} from '../actions';
import ListElem from './listElem';


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
            this.push('/resume');
        }
    }

    componentWillUnmount() {
        this.unsubscibe();
    }

    render() {
        const produits = this.state.produits.map(doc => {
            console.log(doc);
            return <ListElem click={this.handleClick} selected={this.state.state} key={doc._id} element={doc}/>;
        });
        return (<div>
            <ul>
                {produits}
            </ul>
        </div>);
    }

    handleClick(principal) {
        this.props.store.dispatch(instantiatePrincipal(principal));
        this.push('/resume/drink');
    }
}

export default Principal;