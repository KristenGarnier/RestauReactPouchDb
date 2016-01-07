import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Home from './js/app';
import Login from './js/login';
import Resume from './js/resume';
import Register from './js/register';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Home}>
            <IndexRoute component={Login}/>
            <Route path="resume" name="resume" component={Resume}/>
            <Route path="register" name="register" component={Register}/>
        </Route>
    </Router>
);


ReactDOM.render( routes , document.getElementById('react-app'));

/**handleAdd() {
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

    }*/