import React from 'react';
import { Link } from 'react-router-dom';

const DashActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> ערוך פרופיל
            </Link>
            <Link to="/add-training" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> הוסף הדרכות
            </Link>
        </div>
    );
};

export default DashActions;
