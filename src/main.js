import PouchDB from 'pouchdb';
import PouchAuth from 'pouchdb-authentication';
PouchDB.plugin(PouchAuth);

const user = {
    name: 'admin',
    password: 'admin'
};

const todo = {
    _id: new Date().toISOString(),
    title: 'kristen',
    completed: false
};

const pouchOpts = {
    skipSetup: true
};

const db = new PouchDB('http://localhost:5984/todos', pouchOpts);
const localDb = new PouchDB('todos');

db.login(user.name, user.password)
    .then(() => {
        return PouchDB.sync(localDb, db)
    }).then(() => {

        return localDb.put(todo);

    })
    .then(result => {
        return localDb.allDocs({include_docs: true, descending: true})
    })
    .then(docs => {
        docs.rows.map(doc => {
            console.log(doc.doc.title);
        });
    })
    .catch(error => {
        console.error(error);
    });