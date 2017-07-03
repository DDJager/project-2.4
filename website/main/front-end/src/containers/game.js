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
            <div className="content-section z-depth-2 grey lighten-5">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <div className="content-text-section">
                            <div className="profile-section">
                                <h1>{game.name}</h1>
                            </div>
                            <div className="profile-section">
                                <p>{game.description}</p>
                            </div>

                            <div className="profile-section">
                                <h4><b>Achievements</b></h4>
                            </div>
                            <ul>
                                {this.achievements(game)}
                            </ul>
                        </div>
                    </div>
                </div>
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
