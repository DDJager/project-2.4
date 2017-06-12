import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  } from '../actions/index';
import Id from '../components/profile_user';
import MatchHistory from '../components/match_history';
import Achievements from '../components/achievements';

class Profile extends Component {
    render() {
        return (
            <div>{this.props.match.params.id}
                <Id name={this.props.profile.name}/>
                <MatchHistory/>
                <Achievements/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(Profile);