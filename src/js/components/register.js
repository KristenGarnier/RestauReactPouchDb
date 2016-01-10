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
            <div className="container form-connect">
                <div>
                    <p style={{
                    color: 'red'
                    }}>{this.state.error.name}</p>
                </div>
                <h2>Inscription</h2>
                <div className="row">
                    <div className="six columns">
                        <label for="exampleEmailInput">Email</label>
                        <input onChange={this.handleLoginChange} value={this.state.login} className="u-full-width"
                               type="text" placeholder="email@domain.fr" id="exampleEmailInput"/>
                    </div>
                    <div className="six columns">
                        <label for="password">Mot de passe</label>
                        <input className="u-full-width" onChange={this.handlePasswordChange} value={this.state.password}
                               type="password" placeholder="Mot de passe" id="password" required/>
                    </div>
                </div>
                <div className="button-group">
                    <button onClick={this.handleClick} className="button-primary">S'inscrire</button>
                    <Link to="/" className="u-pull-right button">Se connecter</Link>
                </div>
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
                    localStorage.setItem('user', Circular.stringify(res.userCtx));
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
                    name: 'Vous devez être étudiant en licence MMI au puy en velay pour pouvoir vous inscrire'
                }
            });
        }

    }

    userLegit(legit, current) {
        return legit.filter(user => user === current);
    }
}

export default Register;