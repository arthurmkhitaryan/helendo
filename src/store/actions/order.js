export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAIL = 'ADD_ORDER_FAIL';

export function addOrderRequest(cb) {
    return {
        type: ADD_ORDER_REQUEST,
        payload: {cb}
    }
}

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAIL = 'GET_ORDER_FAIL';

export function getOrderRequest(data) {
    return {
        type: GET_ORDER_REQUEST,
        payload: {data}
    }
}

export const GET_ORDER_SINGLE_REQUEST = 'GET_ORDER_SINGLE_REQUEST';
export const GET_ORDER_SINGLE_SUCCESS = 'GET_ORDER_SINGLE_SUCCESS';
export const GET_ORDER_SINGLE_FAIL = 'GET_ORDER_SINGLE_FAIL';

export function getSingleOrderRequest(params) {
    return {
        type: GET_ORDER_SINGLE_REQUEST,
        payload: {params}
    }
}
