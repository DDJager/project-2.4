//this component shows the name and profile picture
//if you can think of a better file name change it
import React, { Component } from 'react';


class Id extends Component {
    render() {
        return(
            <div className="content-section z-depth-2 grey lighten-5">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <div className="content-text-section">

                            <div className="profile-section">
                                <h4><b>Profielafbeelding</b></h4>
                                <img src={this.props.user.picture_url} alt={this.props.user.username} width={100} height={100} />
                            </div>

                            <div className="profile-section">
                                <h4><b>Naam</b></h4>
                                <p>{this.props.user.username}</p>
                            </div>

                            <div className="profile-section">
                                <h4><b>Beschrijving</b></h4>
                                <p>
                                    {this.props.user.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Id;
