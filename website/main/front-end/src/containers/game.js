import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loadGames } from '../actions/index';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {}
        }
    }

    componentDidMount() {
        this.props.loadGames(this.props.user.token);
    }

    getGame() {
        const games = this.props.games;
        const params = this.props.match.params;
        if (games[0]){
            for (let i = 0; i < games.length; i++) {
                if (games[i].name === params.name) {
                    return games[i];
                }
            }
        }

    }

    achievements(game) {
        return game.achievements.map((achieve)=>{
            return <div key={achieve.name}>{achieve.name}</div>;
        });
    }

    loggedIn() {
      if (!localStorage.getItem("token")) {
        return <Redirect to='/login'/>;
      }
    }

    render() {
        const game = this.getGame();
        if (!game) return (
          <div>
          {this.loggedIn()}
          <h1>Loading...</h1>;
          </div>
      )
        return (
            <div>
                <h1>{game.name}</h1>
                <p>{game.description}</p>
                <h3>Achievements</h3>
                <ul>
                    {this.achievements(game)}
                </ul>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadGames}, dispatch)
}

function mapStateToProps(state) {
    return {
        games: state.games,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
