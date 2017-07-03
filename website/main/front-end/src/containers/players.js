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
        console.log(this.props.players.list);
        let userStyle = {
            marginTop: 5,
            marginBottom: 5
        };
        if (this.props.players.list) {
            return (
                this.props.players.list.map((player) => {
                  if (player.username != localStorage.getItem("username")) {
                    const target = `/profile/${player.username}`;
                    return (
                        <li className="collection-item avatar" key={player.username} style={userStyle}>
                          <img src={player.picture_url} width={75} height={75} />
                          <span className="title" style={{fontSize: '2em'}}> @{player.username} </span>
                          <Link to={target} className="secondary-content btn">View Profile</Link>
                        </li>
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
            <div className="content-section z-depth-2 grey lighten-5">
              {this.loggedIn()}
                <div className="row">
                    <div className="col s10 offset-s1">
                        <div className="content-text-section">
                            <div className="profile-section">
                                <h1>Players</h1>
                            </div>
                            <ul className="collection">
                                {this.userList()}
                            </ul>
                        </div>
                    </div>
                </div>
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
