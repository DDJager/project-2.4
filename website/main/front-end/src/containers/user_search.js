import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { loadUsername } from '../actions/index';

class userSearch extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            redirect: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            name: event.target.value,
            redirect: ''
        })
    }

    handleKeyPress(event) {
        if (event.key === 'Enter'){
            this.redirect();
        }
    }

    redirect() {
        const {name} = this.state;
        if (name !== '') {
            this.props.loadUsername(name);
            const route = `/profile/${name}`;
            const to = <Redirect to={route}/>;
            this.setState({
                redirect: to,
                name: ''
            })
        }

    }

    render() {
        return (
          <div className="content-section z-depth-2 grey lighten-5">
              {this.state.redirect}
              <div className="row">
                  <div className="col s10 offset-s1">
                      <div className="content-text-section" style={{fontSize: '1em'}}>
                          <h3>Search Player</h3>
                          <input
                              type="text"
                              value={this.state.name}
                              onChange={this.handleInputChange}
                              onKeyPress={this.handleKeyPress}
                              placeholder="..."
                          />
                          <button className="btn" onClick={this.redirect}>Search</button>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadUsername}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(userSearch)
