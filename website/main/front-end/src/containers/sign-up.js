import React, { Component } from 'react';
import { reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createAccount } from '../actions/index';
import formInput from '../components/form-input';

class signUp extends Component {
    onSubmit(values) {
        console.log(values);
        this.props.createAccount(values);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="username"
                    name="username"
                    type="text"
                    component={formInput}
                />
                <Field
                    label="email"
                    name="email"
                    type="text"
                    component={formInput}
                />
                <Field
                    label="password"
                    name="password"
                    type="password"
                    component={formInput}
                />
                <Field
                    label="password confirmation"
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
    if (!values.email){
        errors.email = "Enter an email";
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
    return bindActionCreators({ createAccount: createAccount() }, dispatch);
}

export default reduxForm({
    validate,
    form: 'SignUp'
})(
    connect(null, mapDispatchToProps)(signUp)
);