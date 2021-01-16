import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EmployeeItem = ({ employee: { _id, fullName, badgeNumber, role } }) => {
    return (
        <tr>
            <td>{fullName}</td>
            <td>{badgeNumber}</td>
            <td>{role}</td>
            <td>
                <Link to={`/employee/${_id}`} className="btn btn-primary">
                    צפה בעובד
                </Link>
            </td>
        </tr>
    );
};

EmployeeItem.propTypes = {
    employee: PropTypes.object.isRequired,
};

export default EmployeeItem;
