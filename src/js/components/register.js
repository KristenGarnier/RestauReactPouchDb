import React, {Component} from 'react';
import {Link} from 'react-router';
import config from '../../../config/config';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            error: false
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.db = props.db;
        this.history = this.props.history;
    }

    render() {
        return (
            <div>
                <div>
                    <p style={{
                    color: 'red'
                    }}>{this.state.error.name}</p>
                </div>
                <input type="text" onChange={this.handleLoginChange} value={this.state.login} placeholder="Username"
                       required/>
                <input type="text" onChange={this.handlePasswordChange} value={this.state.password}
                       placeholder="Password" required/>

                <button onClick={this.handleClick}>Register</button>
                <Link to="/">Connect</Link>
            </div>
        );
    }

    handleLoginChange(event) {
        this.setState({login: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleClick() {
        const legit = this.userLegit(config.authorized, this.state.login);
        console.log(legit);
        if (legit.length !== 0) {
            this.db.signup(this.state.login, this.state.password)
                .then(res => {
                    console.log('User registered');
                    return this.db.login(this.state.login, this.state.password);
                })
                .then(res => {
                    return this.db.getSession();
                })
                .then(res => {
                    console.log(`Welcome ${res.userCtx.name}`);
                    localStorage.setItem('user', res.userCtx);
                    this.history.push('/resume');
                })
                .catch(error => {
                    this.setState({
                        error: error
                    });
                });
        } else {
            console.log('ERRR');
            this.setState({
                error: {
                    name: 'You are not authorized to register'
                }
            });
        }

    }

    userLegit(legit, current) {
        return legit.filter(user => user === current);
    }
}

export default Register;