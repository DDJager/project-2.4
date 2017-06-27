import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { loadUsers } from '../actions/index';

class players extends Component {
    componentDidMount() {
        this.props.loadUsers(this.props.user.token);
    }

    userList() {

        if (this.props.players.list) {
            return (
                this.props.players.list.map((player) => {
                  if (player.username != localStorage.getItem("username")) {
                    const target = `/profile/${player.username}`;
                    return (
                        <li key={player.username}><Link to={target}>{player.username}</Link></li>
                    )
                  }
              })
          )
        }else {
            return <h2>Loading...</h2>
        }
    }

    loggedIn() {
      if (!localStorage.getItem("token")) {
        return <Redirect to='/login'/>;
      }
    }

    render() {
        return (
            <div>
            {this.loggedIn()}
                <ul>
                    {this.userList()}
                </ul>
            </div>
        )
    }
}

function bindStateToProps(state) {
    return {
        players: state.players,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadUsers}, dispatch);
}

export default connect(bindStateToProps, mapDispatchToProps)(players);
