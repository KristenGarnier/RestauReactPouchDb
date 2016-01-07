import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Home from './js/components/app';
import Login from './js/components/login';
import Resume from './js/components/resume';
import Register from './js/components/register';
import Restaurants from './js/components/restaurants';
import Principal from './js/components/principal';
import Drink from './js/components/drinks';
import Supp from './js/components/supplements';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Home}>
            <IndexRoute component={Login}/>
            <Route path="resume" name="resume" component={Resume}>
                <IndexRoute component={Restaurants}/>
                <Route path="product" component={Principal}/>
                <Route path="drink" component={Drink}/>
                <Route path="supplement" component={Supp}/>
            </Route>
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