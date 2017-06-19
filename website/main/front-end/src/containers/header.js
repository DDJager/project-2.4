import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <Link to="/"><div className="btn">Home</div></Link>
                <Link to="/profile"><div className="btn">Profile</div></Link>
                <Link to="/players"><div className="btn">players</div></Link>
                <Link to="/games"><div className="btn">games</div></Link>
                <span>{this.props.user.token ? this.props.user.username : <Link to="/authenticate"><div className="btn">Authenticate</div></Link>}</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);