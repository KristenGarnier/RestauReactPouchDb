import PouchDB from 'pouchdb';
import PouchAuth from 'pouchdb-authentication';
import React, {Component} from 'react';
import config from '../../config/config';
import Login from './login';
const uuid = require('node-uuid');
PouchDB.plugin(PouchAuth);


const pouchOpts = {
    skipSetup: true
};

const db = new PouchDB(config.remoteDb, pouchOpts);
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

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, { db: db, localDb: localDb })}
            </div>
        );
    }
}

export default Home;