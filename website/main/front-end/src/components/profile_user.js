//this component shows the name and profile picture
//if you can think of a better file name change it
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Id extends Component {

    editButton(user) {
        if (user.id == localStorage.getItem('id')) {
            return <Link to="/edit" className="btn">Edit</Link>
        }
    }
    render() {
        if (!this.props.user) {
          return (
              <div className="content-section z-depth-2 grey lighten-5">
                  <div className="row">
                      <div className="col s10 offset-s1">
                          <div className="content-text-section">
                              <div className="profile-picture">
                                  <img src="https://api.adorable.io/avatars/100/unknown.png" alt="no-user-found-img" width={100} height={100} />
                              </div>
                              <div className="profile-info">
                                  <h3>@....</h3>
                                  <p style={{'whiteSpace': 'pre-line'}}>There is no description as there is no user.</p>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          )
        } else {
          return (
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
                                  {this.editButton(this.props.user)}
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          )
        }

    }
}

export default Id;
