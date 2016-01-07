import React, {Component} from 'react';

class Resume extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: 'hello'
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.history = this.props.history;

        this.db = props.db;
        this.localDb = props.localDb;
    }

    render() {
        return (
            <div>
                <h2>{this.state.text}</h2>
                <button onClick={this.handleLogout}>Logout</button>
                {React.cloneElement(this.props.children, { store:this.props.store, localDb: this.localDb, restaurantsDb: this.props.restaurantsDb, productsDb: this.props.productsDb })}
            </div>
        );
    }

    handleLogout(){
        this.db.logout()
            .then(res => {
                localStorage.removeItem('user');
                console.log('Successfully Logout');
                this.history.push('/');
            })
            .catch(err => {
                console.error(err);
            })
    }
}


export default Resume;