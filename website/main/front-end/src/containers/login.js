import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import formInput from '../components/form-input';
// import { login } from '../actions/index'

class Login extends Component {

    onSubmit(values) {

        console.log('ok');
        // this.props.login(values);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Username"
                    name="username"
                    type="text"
                    component={formInput}
                />
                <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={formInput}
                />
                <div className="btn btn-primary" type="submit">Log in</div>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.username) {
        errors.username = "Enter your username";
    }
    if (!values.password) {
        errors.password = "Enter your password";
    }
    return errors;
}

export default reduxForm({
    validate,
    form:'login'
})(Login);