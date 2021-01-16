import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert as AlertBootstrap } from 'react-bootstrap';

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts !== 'undefined' &&
    alerts.length > 0 &&
    alerts.map((alert) => (
        <AlertBootstrap variant={alert.alertType} key={alert.id}>
            {alert.msg}
        </AlertBootstrap>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
