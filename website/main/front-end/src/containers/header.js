import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkLogin, logout } from '../actions/index';

class Header extends Component {

    logout() {
        if (localStorage.getItem("token")) {
            return (
                <button
                    className="btn"
                    onClick={this.props.logout}
                >Logout</button>
            )
        }
    }

    user() {
        if (localStorage.getItem("token")) {
            return "Welkom " + localStorage.getItem("username")
        }
    }

    authenticate() {
        if (!localStorage.getItem("token")) {
            return (
                <Link to="/authenticate" className="section">Authenticate</Link>
            )
        }
    }

    render() {
        return (
            <div className="header teal darken-2 z-depth-3 section">
                <div className="row row-no-margin-bottom">
                    <div className="col s10 offset-s1 navigation">
                        <Link to="/" className="section">Home</Link>
                        <Link to="/profile" className="section">Profile</Link>
                        <Link to="/players" className="section">Players</Link>
                        <Link to="/games" className="section">Games</Link>
                        {this.authenticate()}
                        <span className="user-welcome">{this.user()}</span>
                        {this.logout()}
                    </div>
                </div>
            </div>
        )
    }
}

/*
* User is only imported to let this component re-render
* once change happens to the login status
 */
function mapStateToProps(state) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({checkLogin, logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
