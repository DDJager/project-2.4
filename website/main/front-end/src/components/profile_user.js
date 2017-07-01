//this component shows the name and profile picture
//if you can think of a better file name change it
import React, { Component } from 'react';


class Id extends Component {
    render() {
        if (!this.props.user) {
            return (<h4>user not found</h4>);
        }
        return(
            <div>
                <img src={`http://${this.props.user.picture_url}`} alt={this.props.user.username}/>
                <h1>{this.props.user.username}</h1>
                <p>
                    {this.props.user.description}
                </p>
            </div>
        )
    }
}

export default Id;