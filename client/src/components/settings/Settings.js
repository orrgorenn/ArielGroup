import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import SettingsActions from './SettingsActions';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Settings = ({
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
        <Container>
            <Row>
                <Col>
                    <h1>פרופיל אישי</h1>
                    {profile !== null ? (
                        <Fragment>
                            <SettingsActions />
                            <div className="my-2">
                                <Button
                                    variant="danger"
                                    onClick={() => deleteAccount()}
                                    disabled
                                >
                                    <i className="fas fa-user-minus"></i> מחק את
                                    החשבון
                                </Button>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p>טרם הגדרת פרופיל עבורך. נא הוסף מידע לפרופיל.</p>
                            <Link
                                to="/create-profile"
                                className="btn btn-primary my-1"
                            >
                                צור פרופיל
                            </Link>
                        </Fragment>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

Settings.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Settings
);
