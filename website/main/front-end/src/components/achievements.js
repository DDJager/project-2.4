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
            <div className="achievement" key={achieve.name}>
                <h4>{achieve.name}</h4><br/>
                {achieve.description}
            </div>
        )
    }

    render() {
        if (this.props.user) {
            return (<div></div>)
        }
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