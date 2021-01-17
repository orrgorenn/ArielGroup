import axios from 'axios';
import {
    GET_DEPARTMENTS,
    DEPARTMENT_ERROR,
    DEPARTMENT_DELETED,
    GET_DEPARTMENT,
} from './types';
import { setAlert } from './alert.js';

export const getDepartmentByID = (siteID, dptID) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/site/${siteID}/department/${dptID}`);

        dispatch({
            type: GET_DEPARTMENT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: DEPARTMENT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get all departments by site ID
export const getDepartmentsByID = (siteID) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/site/${siteID}/department`);

        dispatch({
            type: GET_DEPARTMENTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: DEPARTMENT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const deleteDepartment = (siteID, dptID) => async (dispatch) => {
    if (
        window.confirm(
            'האם אתה בטוח שברצונך למחוק את את המחלקה? פעולה זו תמחוק את כלל העובדים תחת המחלקה ופעולה זו אינה ניתנת לשחזור.'
        )
    ) {
        try {
            await axios.delete(`/api/site/${siteID}/department/${dptID}`);

            dispatch({ type: DEPARTMENT_DELETED });
            getDepartmentsByID(siteID);

            dispatch(setAlert('המחלקה נמחקה לצמיתות!', 'success'));
        } catch (err) {
            dispatch({
                type: DEPARTMENT_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    }
};
