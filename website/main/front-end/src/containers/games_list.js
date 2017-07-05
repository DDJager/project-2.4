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
            return (
              // <li key={game.id}>
              <div key={game.id} className="col s6 m6 l4 xl4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{game.name}</span>
                    <p className="">
                      {game.description}
                    </p>
                  </div>
                  <div className="card-action">
                    {this.playButton(game.name)}&nbsp;
                    <Link className="btn" to={target}>View</Link>
                  </div>
                </div>
              </div>
              // </li>
            )
        });
    }

    playButton(name) {
      if (name === 'Guess The Word') {
        return <a className="btn" href="http://localhost:8080/">Play</a>;
      } else {
        return;
      }
    }

    loggedIn() {
      if (!localStorage.getItem("token")) {
        return <Redirect to='/login'/>;
      }
    }

    render() {
        return (
            <div className="content-section z-depth-2 grey lighten-5">
              {this.loggedIn()}
                <div className="row">
                    <div className="col s10 offset-s1">
                        <div className="content-text-section">
                            <div className="profile-section">
                                <h1>Game list</h1>
                            </div>
                            {/* <ul> */}
                            <div className="row">
                                {this.games()}
                            </div>
                            {/* </ul> */}
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
