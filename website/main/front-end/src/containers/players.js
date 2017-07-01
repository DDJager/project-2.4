import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { loadUsers } from '../actions/index';

class players extends Component {
    componentDidMount() {
        this.props.loadUsers(this.props.user.token);
    }

    userList() {
        if (this.props.players.list) {
            return (
                this.props.players.list.map((player) => {
                    const target = `/profile/${player.username}`;
                    return (
                        <li key={player.username}><Link to={target}>{player.username}</Link></li>
                    )
                })
            )
        }else {
            return <h2>Loading...</h2>
        }
    }

    render() {
        return (
            <div className="content-section z-depth-2 grey lighten-5">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <div className="content-text-section">
                            <div className="profile-section">
                                <h1>Players</h1>
                            </div>
                            <ul>
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
