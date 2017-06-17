//this component shows the name and profile picture
//if you can think of a better file name change it
import React, { Component } from 'react';


class Id extends Component {
    render() {
        return(
            <div>
                <img src={this.props.user.picture_url} alt={this.props.user.username}/>
                <h1>{this.props.user.username}</h1>
                <p>
                    {this.props.user.description}
                </p>
            </div>
        )
    }
}

export default Id;