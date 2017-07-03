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

    /*
     * Redirects the user to the home page if they are logged in.
     * If a login attempt has failed displays an error
     */
    statusCheck() {
        const { status } = this.props.user;
        if (status) {
            if (localStorage.getItem("token")) {
                return <Redirect to='/'/>;
            }else {
                return 'Credentials are incorrect';
            }
        }else {
            return '';
        }
    }

    loggedIn() {
      if (localStorage.getItem("token")) {
        return <Redirect to='/'/>;
      }
    }

    render() {
        return (
            <div className="auth-container">
              {this.loggedIn()}
                <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                    {this.statusCheck()}

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
                    <button className="btn" type="submit">Log in</button>
                </form>
            </div>
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
