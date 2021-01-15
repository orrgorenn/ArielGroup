import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTraining } from '../../actions/profile';

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
        <Fragment>
            <h1 className="large text-primary">הוסף הדרכה</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> הוסף הדרכות רלוונטיות
                עבור עובד זה
            </p>
            <small>* - שדות חובה</small>
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addTraining(formData, history);
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* כותרת הדרכה"
                        name="title"
                        value={title}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* חברה מבצעת"
                        name="company"
                        value={company}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <select
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
                    </select>
                </div>
                <div className="form-group">
                    <h4>* תאריך ביצוע</h4>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="oneTime"
                            value={oneTime}
                            checked={oneTime}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    oneTime: !oneTime,
                                });
                                toggleDisabled(!reoccurDisabled);
                            }}
                        />{' '}
                        הדרכה חד פעמית
                    </p>
                </div>
                <div className="form-group">
                    <h4>* מספר חודשים לרענון</h4>
                    <input
                        type="number"
                        name="reoccurrence"
                        value={reoccurrence}
                        onChange={(e) => onChange(e)}
                        disabled={reoccurDisabled ? 'disabled' : ''}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="תיאור ההדרכה"
                        value={description}
                        onChange={(e) => onChange(e)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <h4>* תיעוד</h4>
                    <input
                        type="text"
                        name="proof"
                        value={proof}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <input
                    type="submit"
                    value="הוסף"
                    className="btn btn-primary my-1"
                />
                <Link className="btn btn-light my-1" to="/dashboard">
                    חזור חזרה
                </Link>
            </form>
        </Fragment>
    );
};

AddTraining.propTypes = {
    addTraining: PropTypes.func.isRequired,
};

export default connect(null, { addTraining })(withRouter(AddTraining));
