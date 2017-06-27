import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

import reducers from './reducers/index';
import Header from './containers/header';
import LoginLogic from './containers/login_logic';
import Footer from './components/footer';
import root from './components/root';
import login from './components/sign-in';
import profile from './containers/profile';
import players from './containers/players';
import GamesList from './containers/games_list';
import Game from './containers/game';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <LoginLogic/>
                <Header/>
                <Switch>
                    <Route path="/login" component={login}/>
                    <Route path="/profile/:username?" component={profile}/>
                    <Route path="/players" component={players}/>
                    <Route path="/games/:name" component={Game}/>
                    <Route path="/games" component={GamesList}/>
                    <Route path="/" component={root}/>
                </Switch>
                <Footer/>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
