import React, {Component} from 'react';
import {reset} from '../actions';
import Circular from 'circular-json';


class Resume extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: Circular.parse(localStorage.getItem('user')).name,
            state: this.props.store.getState(),
            user: {}
        };


        this.handleLogout = this.handleLogout.bind(this);
        this.handleClickUser = this.handleClickUser.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.menu = this.menu.bind(this);
        this.history = this.props.history;
        this.pathname = this.props.location.pathname;

        this.db = props.db;
        this.localDb = props.localDb;
        this.db.getUser(this.state.text)
            .then(res => {
                this.setState({
                    user: res
                });
                this.user = res;
            })
            .catch(err => {
                console.error(err);
            })
    }

    componentWillMount() {
        this.unsubscibe = this.props.store.subscribe(() => {
            this.setState({
                state: this.props.store.getState()
            });
        });
    }

    componentWillUnmount() {
        this.unsubscibe();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="four columns">
                        <h2 className="title">Manger</h2>
                    </div>
                    <div className="four columns">
                        <div className="user-bubble" onClick={this.handleClickUser}>
                            <img
                                src={this.state.user.photo}
                                alt="User avatar" width="50"/>
                            <p className="user">{this.state.text}</p>
                        </div>

                    </div>
                    <div className="four columns">
                        <button className="logout" onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="row">

                    {this.menu()}

                    <div className="columns ten">
                        {React.cloneElement(this.props.children, {
                            store: this.props.store,
                            localDb: this.localDb,
                            restaurantsDb: this.props.restaurantsDb,
                            productsDb: this.props.productsDb,
                            user: this.user,
                            SyncHandler: this.props.SyncHandler
                        })}
                    </div>

                </div>
            </ div >
        );
    }

    handleLogout() {
        this.db.logout()
            .then(res => {
                localStorage.removeItem('user');
                console.log('Successfully Logout');
                this.history.push('/');
                this.props.store.dispatch(reset());
            })
            .catch(err => {
                console.error(err);
            })
    }

    handleClickUser() {
        alert('YOU CLICKED BATMAN U BATSTARD');
    }

    handleRedirect(redirect) {
        console.log(redirect);
        this.history.push(redirect);
    }

    menu() {
        const nb = this.nbOfElements(this.state.state);

        const restaurant = <div className="menu-elem" onClick={() => this.handleRedirect('/resume/restaurant')}>
            <p> Restaurants </p>
        </div>;

        const commands = <div className="menu-elem" onClick={() => this.handleRedirect('/resume')}>
            <p> Commandes </p>
        </div>;
        const panier = <div className="menu-elem" onClick={() => this.handleRedirect('/resume/checkout')}>
            <p> Panier  { nb > 0  ? <span className="total">{nb}</span> : '' }</p>
        </div>;
        const produit = <div className="menu-elem" onClick={() => this.handleRedirect('/resume/product')}>
            <p> Produits </p>
        </div>;
        const boisson = <div className="menu-elem" onClick={() => this.handleRedirect('/resume/drink')}>
            <p> Boissons </p>
        </div>;
        const supplements = <div className="menu-elem" onClick={() => this.handleRedirect('/resume/supplement')}>
            <p> Suppléments </p>
        </div>;
        const hr = <hr style={{margin: '0'}}/>;
        if (this.state.state['restaurant'] === undefined || null) {
            return <div className="columns two">
                {commands}
                {hr}
                {restaurant}
                {hr}
                {panier}
            </div>
        }
        else if (this.state.state['principal'] === undefined || null) {
            return <div className="columns two">
                {commands}
                {hr}
                {restaurant}
                {hr}
                {produit}
                {hr}
                {panier}
            </div>
        }
        else if (this.state.state['drink'] === undefined || null) {
            return <div className="columns two">
                {commands}
                {hr}
                {restaurant}
                {hr}
                {produit}
                {hr}
                {boisson}
                {hr}
                {panier}
            </div>
        } else if (this.state.state['supplements'] === undefined || null) {
            return <div className="columns two">
                {commands}
                {hr}
                {restaurant}
                {hr}
                {produit}
                {hr}
                {boisson}
                {hr}
                {supplements}
                {hr}
                {panier}
            </div>
        }

        return <div className="columns two">
            {commands}
            {hr}
            {restaurant}
            {hr}
            {produit}
            {hr}
            {boisson}
            {hr}
            {supplements}
            {hr}
            {panier}
        </div>

    }

    nbOfElements(state){
        if(state['principal'] === undefined || null){
            return 0;
        } else if (state['drink'] === undefined || null) {
            return 1;
        } else if (state['supplements'] === undefined || null) {
            return 2;
        };

        return 2 + state['supplements'].length;
    }
}


export default Resume;