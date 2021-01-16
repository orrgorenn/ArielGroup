import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTraining } from '../../actions/profile';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const AddTraining = ({ addTraining, history }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        field: '',
        date: '',
        oneTime: false,
        reoccurrence: '',
        description: '',
        proof: '',
    });

    const [reoccurDisabled, toggleDisabled] = useState(false);

    const {
        title,
        company,
        field,
        date,
        oneTime,
        reoccurrence,
        description,
        proof,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Container>
            <Row>
                <Col>
                    <h1>הוסף הדרכה</h1>
                    <small>* - שדות חובה</small>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addTraining(formData, history);
                        }}
                    >
                        <Form.Group controlId="formBasicTitle">
                            <Form.Control
                                type="text"
                                placeholder="* כותרת הדרכה"
                                name="title"
                                value={title}
                                onChange={(e) => onChange(e)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicCompany">
                            <Form.Control
                                type="text"
                                placeholder="* חברה מבצעת"
                                name="company"
                                value={company}
                                onChange={(e) => onChange(e)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicField">
                            <Form.Control
                                as="select"
                                name="field"
                                value={field}
                                onChange={(e) => onChange(e)}
                            >
                                <option value="0">* בחר תחום</option>
                                <option value="מעליות">מעליות</option>
                                <option value="בטיחות">בטיחות</option>
                                <option value="אחזקה">אחזקה</option>
                                <option value="גילוי אש">גילוי אש</option>
                                <option value="כיבוי אש">כיבוי אש</option>
                                <option value="עזרה ראשונה">עזרה ראשונה</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicDate">
                            <Form.Label>* תאריך ביצוע</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={date}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicOneTime">
                            <Form.Check
                                type="checkbox"
                                name="oneTime"
                                label="הדרכה חד פעמית"
                                value={oneTime}
                                checked={oneTime}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        oneTime: !oneTime,
                                    });
                                    toggleDisabled(!reoccurDisabled);
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicReoccurrence">
                            <Form.Label>מספר חודשים לרענון</Form.Label>
                            <Form.Control
                                type="number"
                                name="reoccurrence"
                                value={reoccurrence}
                                onChange={(e) => onChange(e)}
                                disabled={reoccurDisabled ? 'disabled' : ''}
                            />
                            <Form.Text className="text-muted">
                                שדה זה הינו חובה במידה ותיבת ״הדרכה חד פעמית״
                                אינה מסומנת.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicDescription">
                            <Form.Control
                                as="textarea"
                                name="description"
                                cols="30"
                                rows="5"
                                placeholder="תיאור ההדרכה"
                                value={description}
                                onChange={(e) => onChange(e)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicProof">
                            <Form.Label>* תיעוד</Form.Label>
                            <Form.Control
                                type="text"
                                name="proof"
                                value={proof}
                                onChange={(e) => onChange(e)}
                            />
                        </Form.Group>

                        <Button type="submit" className="btn btn-primary my-1">
                            הוסף
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

AddTraining.propTypes = {
    addTraining: PropTypes.func.isRequired,
};

export default connect(null, { addTraining })(withRouter(AddTraining));
