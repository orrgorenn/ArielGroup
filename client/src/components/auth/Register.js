import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

export const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConf: '',
    });

    const { firstName, lastName, email, password, passwordConf } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConf) {
            setAlert('הסיסמאות אינן תואמות.', 'danger');
        } else {
            register({ firstName, lastName, email, password });
        }
    };

    // Redirect if already logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">הרשמה</h1>
            <p className="lead">
                <i className="fas fa-user"></i> צור את חשבונך
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="שם פרטי"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="שם משפחה"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="דואר אלקטרוני"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        אנו לא נחלוק את הדואר אלקטרוני שלך עם אף אחד.
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="סיסמה"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="אימות סיסמה"
                        name="passwordConf"
                        value={passwordConf}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="הרשם" />
            </form>
            <p className="my-1">
                כבר רשום אצלנו? <Link to="/login">התחבר כאן</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
