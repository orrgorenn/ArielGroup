import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import employee from './employee';

export default combineReducers({
    alert,
    auth,
    profile,
    employee,
});
