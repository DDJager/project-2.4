import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkLogin, logout } from '../actions/index';

class Header extends Component {

    loggedIn() {
      if(localStorage.getItem("token")) {
        const username = localStorage.getItem("username");
        const profileLink = "/profile/" + username;
        return (
          <div className="header teal darken-2 z-depth-3 section">
              <div className="row row-no-margin-bottom">
                  <div className="col s10 offset-s1 navigation">
                      <span className="user-welcome">
                        <img
                          className="circle"
                          alt=""
                          src={localStorage.getItem('picture_url')}
                          width={50}
                          height={50} /> @{username}
                      </span>
                      <Link to="/" className="section">Home</Link>
                      <Link to={profileLink} className="section">Profile</Link>
                      <Link to="/players" className="section">Players</Link>
                      <Link to="/games" className="section">Games</Link>

                      <button className="btn" onClick={this.props.logout}>Sign out</button>
                  </div>
              </div>
          </div>
        )
      } else {
        return (
          <div className="header teal darken-2 z-depth-3 section">
              <div className="row row-no-margin-bottom">
                  <div className="col s10 offset-s1 navigation">
                      <Link to="/" className="section">Home</Link>
                      <Link to="/login" className="section">Sign In</Link>
                  </div>
              </div>
          </div>
        )
      }
    }

    render() {
      return(
        <div className="header">
        {this.loggedIn()}
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
