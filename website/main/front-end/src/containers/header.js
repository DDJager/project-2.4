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
          <div>
          <Link to="/"><div className="btn">Home</div></Link>
          <Link to={profileLink}><div className="btn">Profile</div></Link>
          <Link to="/players"><div className="btn">Players</div></Link>
          <Link to="/games"><div className="btn">Games</div></Link>
          {username}
          <button onClick={this.props.logout}>Logout</button>
          </div>
        )
      } else {
        return (
          <div>
          <Link to="/"><div className="btn">Home</div></Link>
          <Link to="/login"><div className="btn">Sign in</div></Link>
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
