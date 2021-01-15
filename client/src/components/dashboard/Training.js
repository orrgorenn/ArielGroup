import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteTraining } from '../../actions/profile';

const Training = ({ training, deleteTraining }) => {
    const trainings = training.map((trng) => (
        <tr key={trng._id}>
            <td>{trng.title}</td>
            <td className="hide-sm">{trng.company}</td>
            <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{trng.date}</Moment>
            </td>
            <td>
                {trng.oneTime ? (
                    '-'
                ) : (
                    <Moment format="DD/MM/YYYY">{trng.nextDate}</Moment>
                )}
            </td>
            <td>
                <button
                    onClick={() => deleteTraining(trng._id)}
                    className="btn btn-danger"
                >
                    מחק
                </button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2">הדרכות</h2>
            <table className="table">
                <thead>
                    <th>כותרת</th>
                    <th className="hide-sm">חברה מבצעת</th>
                    <th className="hide-sm">תאריך ביצוע</th>
                    <th>תאריך הבא</th>
                    <th></th>
                </thead>
                <tbody>{trainings}</tbody>
            </table>
        </Fragment>
    );
};

Training.propTypes = {
    training: PropTypes.array.isRequired,
    deleteTraining: PropTypes.func.isRequired,
};

export default connect(null, { deleteTraining })(Training);
