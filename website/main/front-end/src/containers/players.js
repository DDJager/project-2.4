import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUsers } from '../actions/index';

class players extends Component {
    componentDidMount() {
        this.props.loadUsers(this.props.user.token);
    }

    userList() {
        if (this.props.players.list) {
            return (
                this.props.players.list.map((player) => {
                    return (
                        <li key={player.username}>{player.username}</li>
                    )
                })
            )
        }else {
            return <h2>Loading...</h2>
        }

    }

    render() {
        return (
            <div>
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