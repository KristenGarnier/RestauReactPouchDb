import PouchDB from 'pouchdb';
import PouchAuth from 'pouchdb-authentication';
import PouchFind from 'pouchdb-find';
import React, {Component} from 'react';
import config from '../../../config/config';
import store from '../store';
import Login from './login';
const uuid = require('node-uuid');
PouchDB.plugin(PouchAuth);
PouchDB.plugin(PouchFind);


const pouchOpts = {
    skipSetup: true
};

const db = new PouchDB(config.remoteDb, pouchOpts),
    localDb = new PouchDB('todos'),
    productsDb = new PouchDB('products'),
    restaurantsDb = new PouchDB('restaurants'),
    remoteRestaurant = new PouchDB('http://localhost:5984/restaurants'),
    remoteProducts = new PouchDB('http://localhost:5984/products');

remoteProducts.sync(productsDb, {
    live: true,
    retry: true
});
remoteRestaurant.sync(restaurantsDb, {
    live: true,
    retry: true
});

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

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, { store: store, db: db, localDb: localDb, productsDb: productsDb, restaurantsDb: restaurantsDb })}
            </div>
        );
    }
}

export default Home;