import React, { Component } from 'react';
import _ from 'lodash';

import Achievement from './achievement';

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

    option(game) {

    }

    onChangeHandle(game) {
        this.setState({
            selectedGame: game.target.value
        });
    }

    achievementList() {
        const selected = this.state.selectedGame;console.log(this.props.games);
        return _.map(this.props.games, (game) => {console.log('game:', selected);
            if (game.id == selected) {
                return game.achievements.map((achievement)=>{
                    return achievement.name;
                })
            }
        })
    }

    render() {
        return (
            <div>

                <h3>Achievements</h3>
                <select
                    onChange={this.onChangeHandle}
                    value={this.state.selectedGame}
                ><option defaultValue> -- select a game -- </option>
                    {this.dropdownOptions()}
                </select>
                { this.achievementList() }
                <Achievement name="ak" image="favicon.ico"/>
                {/*list of all owned achievements*/}
            </div>
        );
    }
}

export default Achievements;