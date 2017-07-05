import React, { Component } from 'react';
import _ from 'lodash';



class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGame: 'Guess The Word'
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
        // const selected = this.state.selectedGame;
        // return _.map(this.props.achievements[this.props.userId], (achieve) => {
        //     if (achieve.game.id == selected) {
        //         return this.achievement(achieve);
        //     }
        // })
        // for (let i = 0; i < this.props.achievements.length; i++) {
        //   return this.achievement(item);
        // }
        return _.map(this.props.achievements[this.props.userId], (item) => {
          return this.achievement(item);
        })
    }

    achievement(achieve) {
      // return <li className="collection-item" key={new Date() + achieve.description}>lala</li>
        return (
            <div className="collection-item" key={achieve.id + achieve.name}>
                <h4>{achieve.name}</h4><br/>
                {achieve.description}
            </div>
        )
    }

    render() {
      console.log(this.props.achievements);
        if (this.props.user) {
            return (<div></div>)
        }
        return (
            <div className="col s10 offset-s1">
                 <div className="content-text-section">
                    <h4><b>Achievements</b></h4>
                    {/* <select
                        onChange={this.onChangeHandle}
                        value={this.state.selectedGame}>

                        <option defaultValue> -- select a game -- </option>
                        {this.dropdownOptions()}

                    </select> */}

                    {/*list of all achievements belonging to the selected game*/}
                    <ul className="collection">
                    { this.achievementList() }
                  </ul>
                </div>
            </div>

        );
    }
}

export default Achievements;
