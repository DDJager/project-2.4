import React, { Component } from 'react';
import { connect } from 'redux';
import { bindActionCreators } from 'redux';

import { updateAccount } from '../actions/index';

class EditAccount extends Component{
    constructor() {
        super();
        this.state = {
            description: localStorage.getItem('description'),
            picture: localStorage.getItem('picture_url')
        }
        this.handleDescription = this.handleDescription.bind(this);
    }

    handleDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.description} onChange={this.handleDescription}/>
            </div>
        )
    }
}

function maqDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default EditAccount;