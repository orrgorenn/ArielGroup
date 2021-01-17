import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDepartmentsByID } from '../../actions/department';
import Spinner from '../layout/Spinner';
import DepartmentItem from './DepartmentItem';
import { Link } from 'react-router-dom';

const Departments = ({
    auth: { user },
    getDepartmentsByID,
    department: { departments, loading },
}) => {
    useEffect(() => {
        user && getDepartmentsByID(user.site);
    }, [user, getDepartmentsByID]);
    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1>רשימת מחלקות</h1>
                    <Link to="/add-department" className="btn btn-primary">
                        הוסף מחלקה חדשה
                    </Link>
                    <table className="table" style={{ marginTop: '1.5rem' }}>
                        <thead>
                            <tr>
                                <th>כותרת</th>
                                <th>קטגוריה</th>
                                <th>מנהל/ת מחלקה</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.length > 0 ? (
                                departments.map((dpt) => (
                                    <DepartmentItem
                                        key={dpt._id}
                                        department={dpt}
                                        site={user.site}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colspan={4}>
                                        <h5>לא נמצאו מחלקות באתר זה.</h5>
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

Departments.propTypes = {
    getDepartmentsByID: PropTypes.func.isRequired,
    department: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    department: state.department,
});

export default connect(mapStateToProps, { getDepartmentsByID })(Departments);
