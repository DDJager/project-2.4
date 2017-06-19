import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

import { loadGames, loadUsers } from '../actions/index';
import Id from '../components/profile_user';
import MatchHistory from '../components/match_history';
import Achievements from '../components/achievements';


class Profile extends Component {
    /*
    * Gets called when the object is rendered and than
    * calls the action creators to fetch data
    */
    componentDidMount() {

        //Check if there is a user logged in
        if (this.props.user.token) {
            this.props.loadGames(this.props.user.token);

            //Check if a not logged in users info is requested
            if (this.props.match.params.username){
                this.props.loadUsers(this.props.user.token);
            }
        }
    }

    /*
     * Checks if the request is a specific profile
     * in this case it returns that user,
     * else it return the logged in user.
     */
    user() {
        const params = this.props.match.params;
        const players = this.props.players.list;

        if (params.username && players){
            for (let i = 0; i < players.length; i++) {
                if (players[i].username === params.username) {
                    return players[i];
                }
            }
        }else{
            return this.props.user;
        }

    }

    render() {
        return (
            <div>
                <Id user={this.user()}/>
                <MatchHistory/>
                <Achievements games={this.props.games}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile,
        user: state.user,
        games: state.games,
        players: state.players
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({loadUsers, loadGames}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);