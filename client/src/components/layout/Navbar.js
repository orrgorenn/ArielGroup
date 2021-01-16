import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Navbar as NBar, Nav, NavDropdown } from 'react-bootstrap';

export const Navbar = ({
    logout,
    auth: { isAuthenticated, loading, user },
}) => {
    const authLinks = (
        <Fragment>
            <Link to="/dashboard" className="nav-link">
                <i className="fas fa-home"></i>
            </Link>
            {user && user.authLevel > 1 ? (
                <NavDropdown title="ניהול עובדים" id="basic-nav-dropdown">
                    <Link className="dropdown-item" to="/employees">
                        רשימת עובדים
                    </Link>
                    <NavDropdown.Divider />
                    <Link className="dropdown-item" to="/add-employee">
                        הוסף עובד חדש
                    </Link>
                </NavDropdown>
            ) : (
                ''
            )}
            {user && user.authLevel > 2 ? (
                <>
                    <NavDropdown title="ניהול מחלקות" id="basic-nav-dropdown">
                        <Link className="dropdown-item" to="/departments">
                            רשימת מחלקות
                        </Link>
                        <NavDropdown.Divider />
                        <Link className="dropdown-item" to="/add-department">
                            הוסף מחלקה חדשה
                        </Link>
                    </NavDropdown>
                    <NavDropdown title="בקרת איכות" id="basic-nav-dropdown">
                        <Link to="/iso" className="dropdown-item">
                            ISO 9001
                        </Link>
                    </NavDropdown>
                    <NavDropdown title="ניהול משתמשים" id="basic-nav-dropdown">
                        <Link className="dropdown-item" to="/profiles">
                            רשימת משתמשים
                        </Link>
                        <NavDropdown.Divider />
                        <Link className="dropdown-item" to="/add-user">
                            הוסף משתמש חדש
                        </Link>
                    </NavDropdown>
                </>
            ) : (
                ''
            )}
            <NavDropdown title="קריאות שירות" id="basic-nav-dropdown">
                <Link className="dropdown-item" to="/open-tickets">
                    תקלות פתוחות
                </Link>
                <Link className="dropdown-item" to="/closed-tickets">
                    תקלות סגורות
                </Link>
                <NavDropdown.Divider />
                <Link className="dropdown-item" to="/new-ticket">
                    פתח תקלה חדשה
                </Link>
            </NavDropdown>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <Link to="/login" className="nav-link">
                <i className="fas fa-sign-in-alt"></i> התחברות
            </Link>
        </Fragment>
    );

    const endLinks = (
        <>
            <Link to="/settings" className="profLink">
                <i className="fas fa-user"></i>{' '}
                {user && user.firstName + ' ' + user.lastName}
            </Link>
            <Link to="#" onClick={logout} className="profLink">
                <i className="fas fa-sign-out-alt"></i> התנתקות
            </Link>
        </>
    );

    return (
        <NBar bg="dark" expand="lg" variant="dark">
            <Link className="navbar-brand" to="/">
                <i className="fas fa-fan"></i> AGroup
            </Link>
            <NBar.Toggle aria-controls="basic-navbar-nav" />
            <NBar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {!loading && (
                        <Fragment>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Fragment>
                    )}
                </Nav>
                {!loading && (
                    <Fragment>{isAuthenticated ? endLinks : ''}</Fragment>
                )}
            </NBar.Collapse>
        </NBar>
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
