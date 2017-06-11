import React, { Component } from 'react';

import SignUp from './sign-up';
import Login from './login';

export default class authenticate extends Component {
    constructor() {
        super();
        this.state = {
            screen:<Login/>
        }
    }

    toLogin() {
        this.setState({screen:<Login/>});
    }

    toSignUp() {
        this.setState({screen:<SignUp/>})
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

 // authenticate;