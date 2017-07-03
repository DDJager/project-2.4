import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

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
                const interval = setInterval(()=>{
                    if (this.userId()){
                        this.props.loadAchievements(this.userId());
                        this.props.loadMatchHistory(this.userId());
                        clearInterval(interval);
                    }
                }, 1);
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
                const interval = setInterval(()=>{
                    if (this.userId()){
                        this.props.loadAchievements(this.userId());
                        this.props.loadMatchHistory(this.userId());
                        clearInterval(interval);
                    }
                }, 1);
            }

    }

    render() {
        this.loadMissing();
        return (
            <div><UserSearch/>
                <Id user={this.user()}/>
                <MatchHistory stats={this.gamesStats()}/>
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
        achievements: state.achievements,
        matchHistory: state.matchHistory
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({loadUsername, loadGames, loadAchievements, loadMatchHistory}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);