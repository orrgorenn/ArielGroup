import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard">
                    <i class="fas fa-home"></i>{' '}
                    <span className="hide-sm"> דף הבית</span>
                </Link>
            </li>
            <li>
                <Link onClick={logout} to="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">התנתקות</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/register">הרשמה</Link>
            </li>
            <li>
                <Link to="/login">התחברות</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-fan"></i> AGroup
                </Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
