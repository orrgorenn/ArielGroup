import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmployeeByID } from '../../actions/employee';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

const Employee = ({
    getEmployeeByID,
    employee: { employee, loading },
    match,
    auth: { user },
}) => {
    useEffect(() => {
        user && getEmployeeByID(user.site, match.params.id);
    }, [getEmployeeByID, match.params.id, user]);
    return (
        <Fragment>
            {employee === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div style={{ margin: '1rem' }}>
                        <Link to="/employees" className="btn btn-warning">
                            חזרה לרשימת עובדים
                        </Link>
                        <Link
                            to="/add-empl-training"
                            className="btn btn-primary"
                            style={{ marginRight: '10px' }}
                        >
                            הוסף הדרכה נדרשת
                        </Link>
                    </div>
                    <div className="employee">
                        <span
                            style={{ fontSize: '2.5rem', fontWeight: 'bold' }}
                        >
                            {employee.fullName}
                        </span>{' '}
                        <span
                            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                        >
                            - {employee.role}
                        </span>{' '}
                        <span style={{ fontSize: '1rem' }}>
                            ({employee.badgeNumber})
                        </span>
                    </div>
                    {employee.training.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>כותרת</th>
                                    <th>תחום</th>
                                    <th>תאריך ביצוע</th>
                                    <th>תאריך ביצוע הבא</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employee.training.map((trng) => (
                                    <tr>
                                        <td>{trng.title}</td>
                                        <td>{trng.field}</td>
                                        <td>
                                            <Moment format="DD/MM/YYYY">
                                                {trng.date}
                                            </Moment>
                                        </td>
                                        <td>
                                            {trng.nextDate
                                                ? trng.nextDate
                                                : 'הדרכה חד פעמית'}
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
                        <h5>אין הדרכות לעובד זה.</h5>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

Employee.propTypes = {
    getEmployeeByID: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    employee: state.employee,
    auth: state.auth,
});

export default connect(mapStateToProps, { getEmployeeByID })(Employee);
