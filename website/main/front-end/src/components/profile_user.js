//this component shows the name and profile picture
//if you can think of a better file name change it
import React, { Component } from 'react';


class Id extends Component {
    render() {
        if (!this.props.user) {
            return (<h4>user not found</h4>);
        }
        return(
            <div className="content-section z-depth-2 grey lighten-5">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <div className="content-text-section">
                            <div className="profile-picture">
                                <img src={this.props.user.picture_url} alt={this.props.user.username} width={100} height={100} />
                            </div>
                            <div className="profile-info">
                                <h3>@{this.props.user.username}</h3>
                                <p style={{'whiteSpace': 'pre-line'}}>{this.props.user.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Id;
