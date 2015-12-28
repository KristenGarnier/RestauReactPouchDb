import PouchDB from 'pouchdb';
import PouchAuth from 'pouchdb-authentication';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
const uuid = require('node-uuid');
PouchDB.plugin(PouchAuth);

const user = {
    name: 'admin',
    password: 'admin'
};

const pouchOpts = {
    skipSetup: true
};

const db = new PouchDB('http://localhost:5984/todos', pouchOpts);
const localDb = new PouchDB('todos');

const SyncHandler = localDb.sync(db, {
    live: true,
    retry: true
});
SyncHandler.on('complete', () => {
        console.log('DB OUT OF SYNC !')
    })
    .on('error', (err) => {
        console.error(err);
    });

class HW extends Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleLoginChange} value={this.state.login} placeholder="Username"
                       required/>
                <input type="text" onChange={this.handlePasswordChange} value={this.state.password}
                       placeholder="Password" required/>
                <button onClick={this.handleClick}>Connect</button>
                <button onClick={this.handleAdd}>Add input</button>
                <button onClick={this.handleLogout}>Log out</button>
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
        db.login(this.state.login, this.state.password)
            .then(user => {
                this.setState({
                    login: '',
                    password: ''
                });

                return db.getSession()
            })
            .then(res => {
                console.log(`Welcome ${res.userCtx.name}`);
                localStorage.setItem('user', res.userCtx);
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleAdd() {
        if (localStorage.getItem('user') !== null) {
            let todo = {
                _id: uuid.v4(),
                title: 'afterward',
                completed: false
            };
            localDb.put(todo)
                .then(() => {
                    console.log('added !');
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            throw 'You are not connected'
        }

    }

    handleLogout() {
        db.logout()
            .then(res => {
                localStorage.removeItem('user');
                console.log('Successfully Logout');
            })
            .catch(err => {
                console.error(err);
            })
    }
}

ReactDOM.render(<HW />, document.getElementById('react-app'));
