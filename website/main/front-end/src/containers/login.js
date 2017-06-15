import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import formInput from '../components/form-input';
import { login } from '../actions/index'

class Login extends Component {

    onSubmit(values) {
        this.props.login(values);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                {/*
                    * Redirects the user to the home page if they are logged in.
                    * If a login attempt has failed displays an error
                */}
                {this.props.user.status ?
                    this.props.status === 'successful' ?
                        <Redirect to='/'/>
                        : 'Credentials are incorrect'
                    : ''}

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
                <button className="btn btn-primary" type="submit">Log in</button>
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default reduxForm({
    validate,
    form:'login'
})(connect(
    mapStateToProps, mapDispatchToProps
)(Login));