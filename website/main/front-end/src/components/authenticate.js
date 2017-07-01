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
            <div className="content-section z-depth-2 grey lighten-5">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <div className="content-text-section">
                            <button className="btn auth-btn" onClick={()=>this.toLogin()}>Switch to Login</button>
                            <button className="btn auth-btn" onClick={()=>this.toSignUp()}>Switch to Register</button>
                            {this.state.screen}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
