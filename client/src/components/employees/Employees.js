import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EmployeeItem from './EmployeeItem';
import { getEmployeesByID } from '../../actions/employee';
import { Link } from 'react-router-dom';

const Employees = ({
    getEmployeesByID,
    employee: { employees, loading },
    auth: { user },
}) => {
    useEffect(() => {
        user && getEmployeesByID(user.site);
    }, [user, getEmployeesByID]);
    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1>רשימת עובדים</h1>
                    <Link to="/add-employee" className="btn btn-primary">
                        הוספת עובד חדש
                    </Link>
                    <table className="table" style={{ marginTop: '1.5rem' }}>
                        <thead>
                            <tr>
                                <th>שם העובד</th>
                                <th>מספר עובד</th>
                                <th>תפקיד</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((emp) => (
                                    <EmployeeItem
                                        key={emp._id}
                                        employee={emp}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colspan={4}>
                                        <h5>לא נמצאו עובדים באתר זה.</h5>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Fragment>
            )}
        </Fragment>
    );
};

Employees.propTypes = {
    getEmployeesByID: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    employee: state.employee,
});

export default connect(mapStateToProps, { getEmployeesByID })(Employees);
