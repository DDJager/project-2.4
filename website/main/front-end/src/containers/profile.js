import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { Redirect } from 'react-router-dom';

import { loadGames, loadUsername, loadAchievements, loadMatchHistory } from '../actions/index';
import Id from '../components/profile_user';
import MatchHistory from '../components/match_history';
import Achievements from '../components/achievements';
import UserSearch from './user_search';

class Profile extends Component {
    /*
    * Gets called when the object is rendered and than
    * calls the action creators to fetch data
    */
    componentDidMount() {
        //Check if there is a user logged in
        if (localStorage.getItem("token")) {
            this.props.loadGames();

            //Check if the user is already loaded so further information can be requested from the api
            if (this.userId()) {
                this.props.loadAchievements(this.userId());
                this.props.loadMatchHistory(this.userId());
            }
            else{
                if (this.userId()) {
                    this.props.loadAchievements(this.userId());
                    this.props.loadMatchHistory(this.userId());
                }
            }

            //Check if a not logged in users info is requested
            if (this.props.match.params.username) {
                this.props.loadUsername(this.props.match.params.username);
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
        const players = this.props.players;

        if (params.username && players){
            for (let player in players) {
                if (players[player].username === params.username) {
                    return players[player];
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
            const user = this.user();
            return user ? user.id : user;
        }
        return localStorage.id;
    }

    gamesStats() {
        const id = this.userId();
        return id ? this.props.matchHistory[id] : {};
    }

    loadMissing() {
        if (!this.userId() || !this.props.matchHistory[this.userId()]) {
            if (this.userId()){
                this.props.loadAchievements(this.userId());
                this.props.loadMatchHistory(this.userId());
            }
        }
    }

    render() {
        this.loadMissing();
        return (
            <div>
                {this.loggedIn()}
                <UserSearch />
                <Id user={this.user()} />
                <div className="content-section z-depth-2 grey lighten-5">
                    <div className="row">
                        <div className="col s11 m5 l5 xl5 offset-m1 offset-l1 offset-xl1 offset-s1">
                          <MatchHistory stats={this.gamesStats()} />
                        </div>
                        <div className="col s11 offset-s1 m6 l6 xl6 ">
                            <Achievements
                                achievements={this.props.achievements}
                                userId={this.userId()}
                                games={this.props.games} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  // console.log(this.props, state);
    return {
        ...state,
        games: state.games,
        players: state.players,
        achievements: state.achievements,
        matchHistory: state.matchHistory,
        user: state.user
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
      loadUsername,
      loadGames,
      loadAchievements,
      loadMatchHistory
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
