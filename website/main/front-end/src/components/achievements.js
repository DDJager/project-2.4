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
        return (
            _.map(this.props.games, (game)=> {
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
        return _.map(this.props.games, (game) => {
            if (game.id == selected) {
                return game.achievements.map(this.achievement)
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
            <div>
                <h3>Achievements</h3>
                <select
                    onChange={this.onChangeHandle}
                    value={this.state.selectedGame}>

                    <option defaultValue> -- select a game -- </option>
                    {this.dropdownOptions()}

                </select>

                {/*list of all achievements belonging to the selected game*/}
                { this.achievementList() }

            </div>
        );
    }
}

export default Achievements;