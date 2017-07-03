import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkLogin } from '../actions/index';

class LoginLogic extends Component {

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        window.setInterval(()=>{
            if (localStorage.getItem("token")){
                this.props.checkLogin();
            }
        }, 10000);
    }

    render() {
        return (
            <div></div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({checkLogin}, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginLogic);
