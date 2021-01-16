import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileTop = ({
    profile: {
        role,
        social,
        user: { firstName, lastName, profilePicture },
    },
}) => {
    return (
        <div className="profile-top p-2">
            <img className="round-img my-1" src={profilePicture} alt="" />
            <h1 className="large">{firstName + ' ' + lastName}</h1>
            <p className="lead">{role}</p>
            <div className="icons my-1">
                {social && social.twitter && (
                    <Link
                        to={social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-twitter fa-2x"></i>
                    </Link>
                )}
                {social && social.youtube && (
                    <Link
                        to={social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-youtube fa-2x"></i>
                    </Link>
                )}
                {social && social.facebook && (
                    <Link
                        to={social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-facebook fa-2x"></i>
                    </Link>
                )}
                {social && social.instagram && (
                    <Link
                        to={social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-instagram fa-2x"></i>
                    </Link>
                )}
                {social && social.linkedin && (
                    <Link
                        to={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-linkedin fa-2x"></i>
                    </Link>
                )}
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileTop;
