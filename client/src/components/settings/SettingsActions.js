import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (
        <div className="profile-buttons">
            <Link to="/edit-profile" className="btn btn-primary">
                <i className="fas fa-user-circle text-light"></i> ערוך פרופיל
            </Link>
        </div>
    );
};

export default ProfileActions;
