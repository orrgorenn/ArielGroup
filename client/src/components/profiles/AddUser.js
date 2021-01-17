import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register, getSites } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const AddUser = ({
    setAlert,
    register,
    isAuthenticated,
    getSites,
    sites,
}) => {
    useEffect(() => {
        getSites();
    }, [getSites]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConf: '',
        authLevel: '',
        site: '',
    });

    const {
        firstName,
        lastName,
        email,
        password,
        passwordConf,
        authLevel,
        site,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(site);
        if (password !== passwordConf) {
            setAlert('הסיסמאות אינן תואמות.', 'danger');
        } else {
            register({ firstName, lastName, email, password, authLevel, site });
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>פתיחת חשבון חדש</h1>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId="formBasicFirstName">
                            <Form.Control
                                type="text"
                                placeholder="שם פרטי"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicLastName">
                            <Form.Control
                                type="text"
                                placeholder="שם משפחה"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="דואר אלקטרוני"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                            />
                            <Form.Text className="text-muted">
                                אנו לא נחלוק את הדואר האלקטרוני שלך עם אף אחד.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="סיסמה"
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Control
                                type="password"
                                placeholder="אימות סיסמה"
                                name="passwordConf"
                                value={passwordConf}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicSite">
                            <Form.Control
                                as="select"
                                name="site"
                                value={site}
                                onChange={(e) => onChange(e)}
                            >
                                <option value="0">* בחר נכס</option>
                                {sites &&
                                    sites.map((s) => (
                                        <option key={s._id} value={s._id}>
                                            {s.title}
                                        </option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicAuthLevel">
                            <Form.Control
                                as="select"
                                name="authLevel"
                                value={authLevel}
                                onChange={(e) => onChange(e)}
                            >
                                <option value="1">* בחר רמת הרשאה</option>
                                <option value="1">עובד/ת</option>
                                <option value="2">מנהל/ת מחלקה</option>
                                <option value="3">מנהל/ת נכס</option>
                                <option value="4">סמנכ״ל/ית חברת ניהול</option>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            פתח חשבון
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

AddUser.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    getSites: PropTypes.func.isRequired,
    sites: PropTypes.array,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    sites: state.auth.sites,
});

export default connect(mapStateToProps, { setAlert, register, getSites })(
    AddUser
);
