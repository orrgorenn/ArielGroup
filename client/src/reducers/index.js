import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import employee from './employee';
import department from './department';

export default combineReducers({
    alert,
    auth,
    profile,
    employee,
    department,
});
