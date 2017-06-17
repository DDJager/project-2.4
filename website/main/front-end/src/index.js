import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

import reducers from './reducers/index';
import Header from './containers/header';
import Footer from './components/footer';
import root from './components/root';
import authenticate from './components/authenticate';
import profile from './containers/profile';
import players from './containers/players';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route path="/authenticate" component={authenticate}/>
                    <Route path="/profile/:id?" component={profile}/>
                    <Route path="/players" component={players}/>
                    <Route path="/" component={root}/>
                </Switch>
                <Footer/>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));