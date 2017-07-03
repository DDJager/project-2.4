import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { Redirect } from 'react-router-dom';

import { loadGames, loadUsers, loadAchievements } from '../actions/index';
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
        if (localStorage.getItem("token")) {
            this.props.loadGames();
            this.props.loadAchievements(this.userId());

            //Check if a not logged in users info is requested
            if (this.props.match.params.username){
                this.props.loadUsers();
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
            return {
                username: localStorage.getItem("username"),
                picture_url: localStorage.getItem("picture_url"),
                description: localStorage.getItem("description")
            };
        }

    }

    loggedIn() {
        if (!localStorage.getItem("token")) {
            return <Redirect to='/login'/>;
        }
    }
    userId() {
        if (this.props.match.params.username){
            return localStorage.id;
        }
        return localStorage.id;
    }

    render() {
        return (
            <div>
                {this.loggedIn()}
                <Id user={this.user()}/>
                <MatchHistory/>
                <Achievements
                    achievements={this.props.achievements}
                    userId={this.userId()}
                    games={this.props.games}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        games: state.games,
        players: state.players,
        achievements: state.achievements
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({loadUsers, loadGames, loadAchievements}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
