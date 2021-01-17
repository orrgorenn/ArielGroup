import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { createEmployee } from '../../actions/employee';
import { getDepartmentsByID } from '../../actions/department';

const CreateEmployee = ({
    createEmployee,
    getDepartmentsByID,
    department: { departments, loading },
    history,
    auth: { user },
}) => {
    useEffect(() => {
        user && getDepartmentsByID(user.site);
    }, [getDepartmentsByID, user]);

    const [formData, setFormData] = useState({
        fullName: '',
        badgeNumber: '',
        role: '',
        startDate: '',
        department: '',
    });

    const { fullName, badgeNumber, role, startDate, department } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createEmployee(user.site, formData, history);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>צור עובד חדש</h1>
                    <small>* = שדה חובה</small>
                    <br />
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId="formBasicFullName">
                            <Form.Control
                                placeholder="* שם מלא"
                                type="text"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicBadgeNumber">
                            <Form.Label>* מספר עובד</Form.Label>
                            <Form.Control
                                type="number"
                                style={{ width: '15%' }}
                                name="badgeNumber"
                                value={badgeNumber}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>

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

                        <Form.Group controlId="formBasicStartDate">
                            <Form.Label>* תאריך תחילת עבודה</Form.Label>
                            <Form.Control
                                placeholder="dd/mm/yy"
                                type="date"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicStartDate">
                            <Form.Control
                                as="select"
                                name="department"
                                value={department}
                                onChange={(e) => onChange(e)}
                            >
                                <option value="0">* בחר מחלקה</option>
                                {departments &&
                                    departments.map((dep) => (
                                        <option key={dep._id} value={dep._id}>
                                            {dep.title}
                                        </option>
                                    ))}
                            </Form.Control>
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="primary"
                            className="my-1"
                        >
                            צור עובד
                        </Button>
                        <Link
                            style={{ marginRight: '0.5rem' }}
                            className="btn btn-warning my-1"
                            to="/employees"
                        >
                            חזור חזרה
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

CreateEmployee.propTypes = {
    createEmployee: PropTypes.func.isRequired,
    getDepartmentsByID: PropTypes.func.isRequired,
    department: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    department: state.department,
});

export default connect(mapStateToProps, { createEmployee, getDepartmentsByID })(
    withRouter(CreateEmployee)
);
