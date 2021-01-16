import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { firstName },
    },
}) => {
    return (
        <div className="profile-about bg-dark p-2">
            {bio && (
                <>
                    <h2 className="text-light">אודות {firstName}</h2>
                    <p className="text-light">{bio}</p>
                    <div className="line"></div>
                </>
            )}

            <h2 className="text-light">תחומי אחריות</h2>
            <div className="skills">
                {skills &&
                    skills.map((skill, index) => (
                        <div key={index} className="p-1 text-light">
                            <i className="fa fa-check"></i> {skill}
                        </div>
                    ))}
            </div>
        </div>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
