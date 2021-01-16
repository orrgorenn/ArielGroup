import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if already logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>התחבר לחשבונך</h1>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="דואר אלקטרוני"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="סיסמה"
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                                minLength="6"
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            התחבר
                        </Button>
                    </Form>
                    <p className="my-1">
                        עוד לא נרשמת? <Link to="/register">הרשם כאן</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
