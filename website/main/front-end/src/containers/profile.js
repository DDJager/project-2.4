import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        return (
            <div>
                this is a profile of: {this.props.profile.name}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(Profile);