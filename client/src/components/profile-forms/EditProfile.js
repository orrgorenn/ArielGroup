import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history,
}) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        role: '',
        skills: '',
        bio: '',
        youtube: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            role: loading || !profile.role ? '' : profile.role,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.twitter ? '' : profile.twitter,
            facebook: loading || !profile.facebook ? '' : profile.facebook,
            linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
            youtube: loading || !profile.youtube ? '' : profile.youtube,
            instagram: loading || !profile.instagram ? '' : profile.instagram,
        });
    }, [loading]);

    const {
        company,
        website,
        location,
        role,
        skills,
        bio,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, true);
    };

    return (
        <Fragment>
            <h1 className="large text-primary">ערוך פרופיל</h1>
            <p className="lead">
                <i className="fas fa-user"></i> שתף איזה מידע שתרצה בפרופיל
                הציבורי שלך
            </p>
            <small>* = שדה חובה</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <select
                        name="role"
                        value={role}
                        onChange={(e) => onChange(e)}
                    >
                        <option value="0">* בחר תפקיד</option>
                        <option value="מנהל/ת חברת ניהול">
                            מנהל/ת חברת ניהול
                        </option>
                        <option value="מנהל/ת ביטחון">מנהל/ת ביטחון</option>
                        <option value="מנהל/ת אחזקה">מנהל/ת אחזקה</option>
                        <option value="מנהל/ת תפעול">מנהל/ת תפעול</option>
                        <option value="מנהל/ת חניון">מנהל/ת חניון</option>
                        <option value="עובד ביטחון">עובד ביטחון</option>
                        <option value="עובד ניקיון">עובד ניקיון</option>
                        <option value="עובד אחזקה">עובד אחזקה</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="חברה"
                        name="company"
                        value={company}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        נא הקפד למלא את אותו שם עבור עובדים באותה חברה.
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="אתר אינטרנט"
                        name="website"
                        value={website}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="מיקום"
                        name="location"
                        value={location}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* תחומי אחריות"
                        name="skills"
                        value={skills}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        נא הפרד תחומי אחריות בפסיק.
                    </small>
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="תקציר קצר אודות העובד"
                        name="bio"
                        value={bio}
                        onChange={(e) => onChange(e)}
                    ></textarea>
                </div>

                <div className="my-2">
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type="button"
                        className="btn btn-light"
                    >
                        הוסף רשת חברתית
                    </button>
                    <span>לא חובה</span>
                </div>

                {displaySocialInputs && (
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input
                                type="text"
                                placeholder="כתובת טוויטר"
                                name="twitter"
                                value={twitter}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input
                                type="text"
                                placeholder="כתובת פייסבוק"
                                name="facebook"
                                value={facebook}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input
                                type="text"
                                placeholder="כתובת יוטיוב"
                                name="youtube"
                                value={youtube}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input
                                type="text"
                                placeholder="כתובת לינקדאין"
                                name="linkedin"
                                value={linkedin}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input
                                type="text"
                                placeholder="כתובת אינסטגרם"
                                name="instagram"
                                value={instagram}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </Fragment>
                )}

                <input
                    type="submit"
                    value="שלח"
                    className="btn btn-primary my-1"
                />
                <Link className="btn btn-light my-1" to="/dashboard">
                    חזור חזרה
                </Link>
            </form>
        </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(EditProfile)
);
