import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history,
}) => {
    const [formData, setFormData] = useState({
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
            role: loading || !profile.role ? '' : profile.role,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.twitter ? '' : profile.twitter,
            facebook: loading || !profile.facebook ? '' : profile.facebook,
            linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
            youtube: loading || !profile.youtube ? '' : profile.youtube,
            instagram: loading || !profile.instagram ? '' : profile.instagram,
        });
    }, [loading, getCurrentProfile]);

    const {
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
        <Container>
            <Row>
                <Col>
                    <h1>ערוך פרופיל</h1>
                    <small>* = שדה חובה</small>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId="formBasicRole">
                            <Form.Control
                                as="select"
                                name="role"
                                value={role}
                                onChange={(e) => onChange(e)}
                            >
                                <option value="0">* בחר תפקיד</option>
                                <option value="מנהל/ת חברת ניהול">
                                    מנהל/ת חברת ניהול
                                </option>
                                <option value="מנהל/ת ביטחון">
                                    מנהל/ת ביטחון
                                </option>
                                <option value="מנהל/ת אחזקה">
                                    מנהל/ת אחזקה
                                </option>
                                <option value="מנהל/ת תפעול">
                                    מנהל/ת תפעול
                                </option>
                                <option value="מנהל/ת חניון">
                                    מנהל/ת חניון
                                </option>
                                <option value="עובד ביטחון">עובד ביטחון</option>
                                <option value="עובד ניקיון">עובד ניקיון</option>
                                <option value="עובד אחזקה">עובד אחזקה</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicSkills">
                            <Form.Control
                                type="text"
                                placeholder="* תחומי אחריות"
                                name="skills"
                                value={skills}
                                onChange={(e) => onChange(e)}
                            />
                            <small className="form-text">
                                נא הפרד תחומי אחריות בפסיק.
                            </small>
                        </Form.Group>
                        <Form.Group controlId="formBasicBio">
                            <Form.Control
                                as="textarea"
                                placeholder="כמה מילים על עצמך"
                                name="bio"
                                value={bio}
                                onChange={(e) => onChange(e)}
                            ></Form.Control>
                        </Form.Group>

                        <div className="my-2">
                            <Button
                                onClick={() =>
                                    toggleSocialInputs(!displaySocialInputs)
                                }
                                type="button"
                                variant="info"
                            >
                                הוסף רשת חברתית
                            </Button>
                            <span style={{ marginRight: '1rem' }}>לא חובה</span>
                        </div>

                        {displaySocialInputs && (
                            <Container fluid style={{ marginTop: '1rem' }}>
                                <Form.Group>
                                    <Form.Row controlId="formBasicTwitter">
                                        <Col xs="1">
                                            <Form.Text id="twitterHelpBlock">
                                                <i className="fab fa-twitter fa-2x"></i>
                                            </Form.Text>
                                        </Col>
                                        <Col xs="11">
                                            <Form.Control
                                                type="text"
                                                placeholder="כתובת טוויטר"
                                                name="twitter"
                                                value={twitter}
                                                onChange={(e) => onChange(e)}
                                            />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Row controlId="formBasicFacebook">
                                        <Col xs="1">
                                            <Form.Text id="facebookHelpBlock">
                                                <i className="fab fa-facebook fa-2x"></i>
                                            </Form.Text>
                                        </Col>
                                        <Col xs="11">
                                            <Form.Control
                                                type="text"
                                                placeholder="כתובת פייסבוק"
                                                name="facebook"
                                                value={facebook}
                                                onChange={(e) => onChange(e)}
                                            />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Row controlId="formBasicYoutube">
                                        <Col xs="1">
                                            <Form.Text id="youtubeHelpBlock">
                                                <i className="fab fa-youtube fa-2x"></i>
                                            </Form.Text>
                                        </Col>
                                        <Col xs="11">
                                            <Form.Control
                                                type="text"
                                                placeholder="כתובת יוטיוב"
                                                name="youtube"
                                                value={youtube}
                                                onChange={(e) => onChange(e)}
                                            />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Row controlId="formBasicLinkedin">
                                        <Col xs="1">
                                            <Form.Text id="linkedinHelpBlock">
                                                <i className="fab fa-linkedin fa-2x"></i>
                                            </Form.Text>
                                        </Col>
                                        <Col xs="11">
                                            <Form.Control
                                                type="text"
                                                placeholder="כתובת לינקדאין"
                                                name="linkedin"
                                                value={linkedin}
                                                onChange={(e) => onChange(e)}
                                            />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Row controlId="formBasicInstagram">
                                        <Col xs="1">
                                            <Form.Text id="instagramHelpBlock">
                                                <i className="fab fa-instagram fa-2x"></i>
                                            </Form.Text>
                                        </Col>
                                        <Col xs="11">
                                            <Form.Control
                                                type="text"
                                                placeholder="כתובת אינסטגרם"
                                                name="instagram"
                                                value={instagram}
                                                onChange={(e) => onChange(e)}
                                            />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>
                            </Container>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="my-1"
                        >
                            עדכן
                        </Button>
                        <Link
                            style={{ marginRight: '0.5rem' }}
                            className="btn btn-warning my-1"
                            to="/profile"
                        >
                            חזור חזרה
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
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
