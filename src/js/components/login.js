import React, {Component} from 'react';
import {Link} from 'react-router';

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

    componentDidMount(){
        if(localStorage.getItem('user')){
            this.history.push('/resume');
        }
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleLoginChange} value={this.state.login} placeholder="Username"
                       required/>
                <input type="text" onChange={this.handlePasswordChange} value={this.state.password}
                       placeholder="Password" required/>

                <button onClick={this.handleClick}>Connect</button>
                <Link to="register">Register</Link>
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
                localStorage.setItem('user', res.userCtx);
                this.history.push('/resume');
            })
            .catch(error => {
                console.error(error);
            });

    }
}


export default Login;