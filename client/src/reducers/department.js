import {
    GET_DEPARTMENTS,
    DEPARTMENT_ERROR,
    GET_DEPARTMENT,
    DEPARTMENT_DELETED,
} from '../actions/types';

const initialState = {
    department: null,
    departments: [],
    loading: true,
    error: {},
};
export default function departmentReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_DEPARTMENT:
            return {
                ...state,
                department: payload,
                loading: false,
            };
        case GET_DEPARTMENTS:
            return {
                ...state,
                departments: payload,
                department: null,
                loading: false,
            };
        case DEPARTMENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case DEPARTMENT_DELETED:
            return {
                ...state,
                department: null,
                loading: false,
            };
        default:
            return state;
    }
}
