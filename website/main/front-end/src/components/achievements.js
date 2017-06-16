import React, { Component } from 'react';
import _ from 'lodash';

import Achievement from './achievement';

class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGame: ''
        }
        this.onChangeHandle = this.onChangeHandle.bind(this);
    }

    dropdownOptions() {
        return (
            _.map(this.props.games, this.option)
        );
    }

    option(game) {
        return (
            <option key={game.id} value={game.id}>{game.name}</option>
        )
    }

    onChangeHandle(game) {
        this.setState({
            selectedGame: game.target.value
        });
    }

    render() {
        return (
            <div>

                <h3>Achievements</h3>
                <select
                    onChange={this.onChangeHandle}
                    value={this.state.selectedGame}
                >
                    {this.dropdownOptions()}
                </select>
                <Achievement name="ak" image="favicon.ico"/>
                {/*list of all owned achievements*/}
            </div>
        );
    }
}

export default Achievements;