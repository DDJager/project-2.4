import React, { Component } from 'react';
import { reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createAccount } from '../actions/index';
import formInput from '../components/form-input';

class signUp extends Component {
    onSubmit(values) {
        this.props.createAccount(values);
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
                    label="Description"
                    name="description"
                    type="text"
                    component={formInput}
                />
                <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={formInput}
                />
                <Field
                    label="Password confirmation"
                    name="passwordConfirmation"
                    type="password"
                    component={formInput}
                />
                <button className="btn btn-primary" type="submit">Sign up</button>
            </form>
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