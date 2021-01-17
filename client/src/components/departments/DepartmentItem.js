import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteDepartment } from '../../actions/department';

const DepartmentItem = ({
    department: { _id, title, category, owner },
    site,
    deleteDepartment,
}) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{category}</td>
            <td>{owner ? owner : '-'}</td>
            <td>
                <Link className="btn btn-primary" to={`/department/${_id}`}>
                    הגדרות מחלקה
                </Link>
            </td>
        </tr>
    );
};

DepartmentItem.propTypes = {
    department: PropTypes.object.isRequired,
    deleteDepartment: PropTypes.func.isRequired,
};

export default connect(null, { deleteDepartment })(DepartmentItem);
