import React, { Component } from 'react';
import { reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createAccount } from '../actions/index';
import formInput from '../components/form-input';

class signUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ''
        }
    }

    onSubmit(values) {
        this.props.createAccount(values, ()=>{
            this.successful();
        },
            this.failed()
            );
    }

    successful() {
        this.props.toLogin();
    }

    failed() {
        this.setState({
            status: 'This account already exists'
        });
    }

    render() {
        return (
            <div className="auth-container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                    {this.state.status}
                    <Field
                        label="Username"
                        name="username"
                        type="text"
                        className="auth-label"
                        component={formInput}
                    />
                    <Field
                        label="Description"
                        name="description"
                        type="text"
                        className="auth-label"
                        component={formInput}
                    />
                    <Field
                        label="Password"
                        name="password"
                        type="password"
                        className="auth-label"
                        component={formInput}
                    />
                    <Field
                        label="Password confirmation"
                        name="passwordConfirmation"
                        type="password"
                        className="auth-label"
                        component={formInput}
                    />
                    <button className="btn" type="submit">Sign up</button>
                </form>
            </div>
        );
    }
}
/*
* Rules for checking the form input if the
* errors object contains something the form wont submit
*/
function validate(values) {
    const errors ={};
    if (!values.username){
        errors.username = "Enter an username";
    }
    if (!values.description){
        errors.description = "Add a description of yourself";
    }
    if (!values.password){
        errors.password = "Enter a password";
    }
    if (values.passwordConfirmation !== values.password){
        errors.passwordConfirmation = "The passwords do not match";
    }
    if (!values.passwordConfirmation){
        errors.passwordConfirmation = "Confirm your chosen password";
    }
    return errors;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createAccount: createAccount }, dispatch);
}

export default reduxForm({
    validate,
    form: 'SignUp'
})(
    connect(null, mapDispatchToProps)(signUp)
);
