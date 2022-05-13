export const SENT_REGISTER_REQUEST = 'SENT_REGISTER_REQUEST';
export const SENT_REGISTER_SUCCESS = 'SENT_REGISTER_SUCCESS';
export const SENT_REGISTER_FAIL = 'SENT_REGISTER_FAIL';

export function sentRegisterRequest(formData, cb) {
    return {
        type: SENT_REGISTER_REQUEST,
        payload: {
            formData, cb
        }
    }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function loginRequest(formData, cb) {
    return {
        type: LOGIN_REQUEST,
        payload: {
            formData, cb
        }
    }
}

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';

export function getUserRequest() {
    return {
        type: GET_USER_REQUEST,
        payload: {}
    }
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export function getUserUpdateRequest(formData, cb) {
    return {
        type: UPDATE_USER_REQUEST,
        payload: {
            formData, cb
        }
    }
}
