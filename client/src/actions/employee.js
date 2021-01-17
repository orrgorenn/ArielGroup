import axios from 'axios';
import { setAlert } from './alert';
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

export const createEmployee = (
    siteID,
    formData,
    history,
    edit = false
) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.put(
            `/api/site/${siteID}/employee`,
            formData,
            config
        );

        dispatch({
            type: GET_EMPLOYEE,
            payload: res.data,
        });

        // Sending success alert
        dispatch(
            setAlert(
                edit ? 'הפרופיל עודכן בהצלחה!' : 'הפרופיל נוצר בהצלחה!',
                'success'
            )
        );

        if (!edit) {
            history.push('/employees');
        }
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
