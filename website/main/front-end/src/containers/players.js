import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { loadUsers } from '../actions/index';

class Players extends Component {
    componentDidMount() {
        this.props.loadUsers(this.props.user.token);
    }

    userList() {
        if (this.props.players) {
            return (
                _.map(this.props.players, (player) => {
                    const target = `/profile/${player.username}`;
                    return (
                        <li className="collection-item avatar" key={player.username}>
                          <img src={player.picture_url} width={75} height={75} />
                          <span className="title" style={{fontSize: '2em'}}> @{player.username} </span>
                          <Link to={target} className="secondary-content btn">View Profile</Link>
                        </li>
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
                <ul className="collection">
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

export default connect(bindStateToProps, mapDispatchToProps)(Players);
