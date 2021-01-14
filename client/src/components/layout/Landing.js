import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Ariel Group</h1>
                    <p className="lead">
                        טקסט טקסט טקסט טקסט טקסט טקסט טקסט טקסט
                    </p>
                    <div className="buttons">
                        <Link to="register" className="btn btn-primary">
                            הרשמה
                        </Link>
                        <Link to="/login" className="btn btn-primary">
                            התחברות
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
