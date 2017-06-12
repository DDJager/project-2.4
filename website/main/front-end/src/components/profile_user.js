//this component shows the name and profile picture
//if you can think of a better file name change it
import React, { Component } from 'react';


class Id extends Component {
    render() {
        return(
        <div>
            <img src={this.props.image}/>
            <h1>{this.props.name}</h1>
        </div>)
    }
}

export default Id;