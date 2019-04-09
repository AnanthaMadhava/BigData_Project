import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link  to="/home" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link" onClick={this.onLogoutClick.bind(this)}>{' '}Logout</a>
                </li>
                {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img 
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title={user.name}
                        />{' '}
                        {user.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#" onClick={this.onLogoutClick.bind(this)}>Logout</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </li> */}
                {/* <li className="nav-item">
                    <a className="nav-link" href="" onClick={this.onLogoutClick.bind(this)}>
                        <img 
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title={user.name}
                        />{' '}
                        Logout
                    </a>
                </li> */}
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                    <Link  to="/register" className="nav-link">Sign Up</Link>
                </li> */}
                <li className="nav-item">
                    <Link  to="/login"  className="nav-link">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                <Link  to="/" className="navbar-brand">BIG DATA</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard"> Dashboard
                        </Link>
                    </li>
                    </ul>
                    { isAuthenticated ? authLinks : guestLinks }
                </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));