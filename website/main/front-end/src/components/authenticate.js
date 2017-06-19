import React, { Component } from 'react';

import SignUp from '../containers/sign-up';
import Login from '../containers/login';

export default class authenticate extends Component {
    constructor() {
        super();
        this.state = {
            screen:<Login toLogin={this.toLogin}/>
        };
        this.toLogin = this.toLogin.bind(this);
    }

    toLogin() {
        this.setState({screen:<Login/>});
    }

    toSignUp() {
        this.setState({screen:<SignUp toLogin={this.toLogin}/>})
    }

    render() {
        return (
            <div>
                <button onClick={()=>this.toLogin()}>Login</button>
                <button onClick={()=>this.toSignUp()}>Register</button>
                {this.state.screen}
            </div>
        );
    }
}