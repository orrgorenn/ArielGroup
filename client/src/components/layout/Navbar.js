import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-fan"></i> AGroup
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to="/register">הרשמה</Link>
                </li>
                <li>
                    <Link to="/login">התחברות</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
