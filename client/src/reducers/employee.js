import { GET_EMPLOYEES, EMPLOYEE_ERROR, GET_EMPLOYEE } from '../actions/types';

const initialState = {
    employee: null,
    employees: [],
    loading: true,
    error: {},
};

export default function employeeReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_EMPLOYEE:
            return {
                ...state,
                employee: payload,
                loading: false,
            };
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: payload,
                loading: false,
            };
        case EMPLOYEE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}
