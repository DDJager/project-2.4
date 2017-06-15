import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

import { loadProfile,  loadGames} from '../actions/index';
import Id from '../components/profile_user';
import MatchHistory from '../components/match_history';
import Achievements from '../components/achievements';


class Profile extends Component {
    componentDidMount() {
        //load the data of the api
        if (this.props.user.token) {
            this.props.loadGames(this.props.user.token);
        }
    }

    render() {
        return (
            <div>{this.props.match.params.id}
                <Id name={this.props.profile.name}/>
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
        games: state.games
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({loadProfile, loadGames}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);