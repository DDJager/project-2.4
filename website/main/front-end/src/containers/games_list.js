import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { loadGames } from '../actions/index';

class GamesList extends Component {
    componentDidMount() {
        this.props.loadGames(this.props.user.token);
    }

    games() {
        return _.map(this.props.games, (game)=>{
            const target = `/games/${game.name}`;
            return <li key={game.id}><Link to={target}>{game.name}</Link></li>
        });
    }

    render() {
        return (
            <div className="content-section z-depth-2 grey lighten-5">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <div className="content-text-section">
                            <div className="profile-section">
                                <h1>Game list</h1>
                            </div>
                            <ul>
                                {this.games()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        games: state.games
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadGames:loadGames}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList)
