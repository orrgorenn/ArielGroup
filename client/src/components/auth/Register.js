import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
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
            console.log('Passwords do not match.');
        } else {
            console.log('success');
        }
    };

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
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="שם משפחה"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="דואר אלקטרוני"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
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
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="אימות סיסמה"
                        name="passwordConf"
                        value={passwordConf}
                        onChange={(e) => onChange(e)}
                        minLength="6"
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

export default Register;
