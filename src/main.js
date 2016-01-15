import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './js/components/app';
import Login from './js/components/login';
import Resume from './js/components/resume';
import Register from './js/components/register';
import Restaurants from './js/components/restaurants';
import Principal from './js/components/principal';
import Drink from './js/components/drinks';
import Supp from './js/components/supplements';
import Checkout from './js/components/checkout';
import Commands from './js/components/commandsList';
import Single from './js/components/singleCommand';
import Call from './js/components/call';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Home}>
            <IndexRoute component={Login}/>
            <Route path="resume" name="resume" component={Resume}>
                <IndexRoute component={Commands}/>
                <Route path="restaurant" name="restaurant" component={Restaurants}/>
                <Route path="product" name="product" component={Principal}/>
                <Route path="drink" name="drink" component={Drink}/>
                <Route path="supplement" name="supplement" component={Supp}/>
                <Route path="checkout" name="checkout" component={Checkout}/>
                <Route path="call" name="call" component={Call}/>
                <Route path="command/:id" name="singleCommand" component={Single}/>
            </Route>
            <Route path="register" name="register" component={Register}/>
        </Route>
    </Router>
);


ReactDOM.render( routes , document.getElementById('react-app'));