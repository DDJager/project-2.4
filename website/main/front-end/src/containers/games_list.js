import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

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

    loggedIn() {
      if (!localStorage.getItem("token")) {
        return <Redirect to='/login'/>;
      }
    }

    render() {
        return (
            <div>
                {this.loggedIn()}
                <ul>
                    {this.games()}
                </ul>
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
