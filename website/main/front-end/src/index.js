import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import { Provider } from 'react-redux';

import reducers from './reducers/index';
import Header from './components/header';
import Footer from './components/footer';
import root from './components/root';
import authenticate from './components/authenticate';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route path="/authenticate" component={authenticate}/>
                    <Route path="/" component={root}/>
                </Switch>
                <Footer/>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));