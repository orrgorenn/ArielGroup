import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading },
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">דף הבית</h1>
            <p className="lead">
                <i className="fas fa-user"></i> ברוכים הבאים,{' '}
                {user && user.firstName && user.lastName
                    ? user.firstName + ' ' + user.lastName
                    : null}
            </p>
            {profile !== null ? (
                <Fragment>
                    <div className="my-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteAccount()}
                        >
                            <i className="fas fa-user-minus"></i> מחק את החשבון
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p>טרם הגדרת פרופיל עבורך. נא הוסף מידע לפרופיל.</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        צור פרופיל
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
);
