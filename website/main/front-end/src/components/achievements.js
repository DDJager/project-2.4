import React, { Component } from 'react';
import _ from 'lodash';

class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGame: ''
        };
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }

    dropdownOptions() {
        const games = {};
        _.map(this.props.achievements[this.props.userId], (achievement)=>{
            const game = achievement.game;
            games[game.id] = {
                id: game.id,
                name: game.name
            }
        });

        return (
            _.map(games, (game)=> {
                return (
                    <option key={game.id} value={game.id}>{game.name}</option>
                )
            })
        );
    }

    onChangeHandle(game) {
        this.setState({
            selectedGame: game.target.value
        });
    }

// TODO get info about the owned achievements
    achievementList() {
        const selected = this.state.selectedGame;
        return _.map(this.props.achievements[this.props.userId], (achieve) => {
            if (achieve.game.id == selected) {
                return this.achievement(achieve);
            }
        })
    }

    achievement(achieve) {
        return (
            <div className="achievement">
                <h4>{achieve.name}</h4><br/>
                {achieve.description}
            </div>
        )
    }

    render() {
        return (
            <div className="content-section z-depth-2 grey lighten-5">
                <div className="row">
                    <div className="col s10 offset-s1">
                         <div className="content-text-section">
                            <h4><b>Achievements</b></h4>
                            <select
                                onChange={this.onChangeHandle}
                                value={this.state.selectedGame}>

                                <option defaultValue> -- select a game -- </option>
                                {this.dropdownOptions()}

                            </select>

                            {/*list of all achievements belonging to the selected game*/}
                            { this.achievementList() }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Achievements;
