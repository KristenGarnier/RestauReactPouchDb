import React, {Component} from 'react';
import {Link} from 'react-router';
import Circular from 'circular-json';

class Login extends Component {
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

    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.history.push('/resume');
        }
    }

    render() {
        return (
            <div className="container form-connect">
                <h2>Connectez vous</h2>
                <div className="row">
                    <div className="six columns">
                        <label htmlFor="exampleEmailInput">Email</label>
                        <input onChange={this.handleLoginChange} value={this.state.login} className="u-full-width"
                               type="text" placeholder="email@domain.fr" id="exampleEmailInput"/>
                    </div>
                    <div className="six columns">
                        <label htmlFor="password">Mot de passe</label>
                        <input className="u-full-width" onChange={this.handlePasswordChange} value={this.state.password}
                               type="password" placeholder="Mot de passe" id="password" required/>
                    </div>
                </div>
                <div className="button-group">
                    <button onClick={this.handleClick} className="button-primary">Se connecter</button>
                    <Link to="register" className="u-pull-right button">S'inscrire</Link>
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
        this.db.login(this.state.login, this.state.password)
            .then(user => {
                this.setState({
                    login: '',
                    password: ''
                });

                return this.db.getSession()
            })
            .then(res => {
                console.log(`Welcome ${res.userCtx.name}`);
                localStorage.setItem('user', Circular.stringify(res.userCtx));
                this.history.push('/resume');
            })
            .catch(error => {
                console.error(error);
            });

    }
}


export default Login;