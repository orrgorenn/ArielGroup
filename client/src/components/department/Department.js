import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDepartmentByID } from '../../actions/department';
import Spinner from '../layout/Spinner';

const Department = ({
    getDepartmentByID,
    department: { department, loading },
    match,
    auth: { user },
}) => {
    useEffect(() => {
        user && getDepartmentByID(user.site, match.params.id);
    }, [getDepartmentByID, match.params.id, user]);
    return (
        <Fragment>
            {department === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div style={{ margin: '1rem' }}>
                        <Link to="/departments" className="btn btn-warning">
                            חזרה לרשימת מחלקות
                        </Link>
                        <Link
                            to="/add-dpt-training"
                            className="btn btn-primary"
                            style={{ marginRight: '10px' }}
                        >
                            הוסף הדרכה נדרשת
                        </Link>
                    </div>
                    <div className="department">
                        <span
                            style={{ fontSize: '2.5rem', fontWeight: 'bold' }}
                        >
                            {department.title}
                        </span>{' '}
                        <span
                            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                        >
                            - תחום: {department.category}
                        </span>{' '}
                        <span style={{ fontSize: '1rem' }}>
                            (
                            {department.owner
                                ? department.owner
                                : 'אין מנהל/ת מחלקה למחלקה זו'}
                            )
                        </span>
                    </div>
                    {department.defaultTraining.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>כותרת</th>
                                    <th>תחום</th>
                                    <th>מחזוריות</th>
                                </tr>
                            </thead>
                            <tbody>
                                {department.defaultTraining.map((trng) => (
                                    <tr>
                                        <td>{trng.title}</td>
                                        <td>{trng.field}</td>
                                        <td>
                                            {trng.oneTime
                                                ? 'חד פעמית'
                                                : trng.reoccurance + ' חודשים'}
                                        </td>
                                        <td>
                                            <button className="btn btn-danger">
                                                מחק
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h5>אין הדרכות נדרשות למחלקה זו.</h5>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

Department.propTypes = {
    getDepartmentByID: PropTypes.func.isRequired,
    department: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    department: state.department,
    auth: state.auth,
});

export default connect(mapStateToProps, { getDepartmentByID })(Department);
