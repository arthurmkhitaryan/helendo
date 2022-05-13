export const ADD_CART_REQUEST = 'ADD_CART_REQUEST';
export const ADD_CART_SUCCESS = 'ADD_CART_SUCCESS';
export const ADD_CART_FAIL = 'ADD_CART_FAIL';

export function addCartRequest(formData, cb) {
    return {
        type: ADD_CART_REQUEST,
        payload: {formData, cb}
    }
}


export const GET_CART_REQUEST = 'GET_CART_REQUEST';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_FAIL = 'GET_CART_FAIL';

export function getCartRequest(data) {
    return {
        type: GET_CART_REQUEST,
        payload: {data}
    }
}

export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAIL = 'UPDATE_CART_FAIL';

export function updateCartRequest(formData, cb) {
    return {
        type: UPDATE_CART_REQUEST,
        payload: {formData, cb}
    }
}

export const DELETE_CART_REQUEST = 'DELETE_CART_REQUEST';
export const DELETE_CART_SUCCESS = 'DELETE_CART_SUCCESS';
export const DELETE_CART_FAIL = 'DELETE_CART_FAIL';

export function deleteCartRequest(id, cb) {
    return {
        type: DELETE_CART_REQUEST,
        payload: {id, cb}
    }
}
