import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkLogin } from '../actions/index';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            token: localStorage.getItem("token")
        }
    }

    logout() {
        // if (localStorage.getItem("token")) {
            return (
                <button onClick={()=>{
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    localStorage.removeItem("picture_url");
                    localStorage.removeItem("description");
                    this.setState({token: localStorage.getItem("token")});
                }

                }>Logout</button>
            )
        // }
    }

    user() {
        if (localStorage.getItem("token")) {
            return (
            localStorage.getItem("username")
        )}
    }

    authenticate() {
        if (!localStorage.getItem("token")) {
            return (
                <Link to="/authenticate"><div className="btn">Authenticate</div></Link>
            )
        }
    }

    render() {
        return (
            <div className="header">
                <Link to="/"><div className="btn">Home</div></Link>
                <Link to="/profile"><div className="btn">Profile</div></Link>
                <Link to="/players"><div className="btn">players</div></Link>
                <Link to="/games"><div className="btn">games</div></Link>
                {this.authenticate()}
                {this.user()}
                {localStorage.getItem("token") ? this.logout() : ''}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({checkLogin}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);