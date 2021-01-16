import axios from 'axios';
import { GET_EMPLOYEES, EMPLOYEE_ERROR, GET_EMPLOYEE } from './types';

// Get all employees by ID
export const getEmployeesByID = (siteID) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/site/${siteID}/employee`);

        dispatch({
            type: GET_EMPLOYEES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EMPLOYEE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get employee by Employee ID
export const getEmployeeByID = (siteID, employeeID) => async (dispatch) => {
    try {
        const res = await axios.get(
            `/api/site/${siteID}/employee/${employeeID}`
        );

        dispatch({
            type: GET_EMPLOYEE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: EMPLOYEE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
