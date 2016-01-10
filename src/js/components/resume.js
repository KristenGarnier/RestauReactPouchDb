import React, {Component} from 'react';
import {reset} from '../actions';
import Circular from 'circular-json';


class Resume extends Component {
    constructor(props) {
        super(props);

        console.log(Circular.parse(localStorage.getItem('user')));
        this.state = {
            text: Circular.parse(localStorage.getItem('user')).name
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.history = this.props.history;

        this.db = props.db;
        this.localDb = props.localDb;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="four columns">
                        <h2 className="title">Manger</h2>
                    </div>
                    <div className="four columns">
                        <p className="user">Utilisateur : {this.state.text}</p>
                    </div>
                    <div className="four columns">
                        <button className="logout" onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="container">
                    {React.cloneElement(this.props.children, {
                        store: this.props.store,
                        localDb: this.localDb,
                        restaurantsDb: this.props.restaurantsDb,
                        productsDb: this.props.productsDb
                    })}
                </div>
            </div>
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
}


export default Resume;