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
PouchDB.debug.enable('*');

window.PouchDB = PouchDB;


const pouchOpts = {
    skipSetup: true
};

const db = new PouchDB(config.remoteDb, pouchOpts),
    localDb = new PouchDB('comm'),
    productsDb = new PouchDB('products'),
    restaurantsDb = new PouchDB('restaurants'),
    remoteRestaurant = new PouchDB(config.remoteRestaurants),
    remoteProducts = new PouchDB(config.remoteProducts);


remoteProducts.sync(productsDb, {
    live: true,
    retry: true
});
remoteRestaurant.sync(restaurantsDb, {
    live: true,
    retry: true
});

const SyncHandler = db.sync(localDb, {
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
                {React.cloneElement(this.props.children, {
                    store: store,
                    db: db,
                    localDb: localDb,
                    productsDb: productsDb,
                    restaurantsDb: restaurantsDb,
                    SyncHandler: SyncHandler
                })}
            </div>
        );
    }
}

export default Home;