export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL';

export function getProductListRequest(filter, categoryId) {
    console.log(filter)
    return dispatch => {
        dispatch({
            type: GET_PRODUCT_REQUEST,
            payload: {filter, categoryId}
        })
    }
}

export const GET_PRODUCT_SINGLE_REQUEST = 'GET_PRODUCT_SINGLE_REQUEST';
export const GET_PRODUCT_SINGLE_SUCCESS = 'GET_PRODUCT_SINGLE_SUCCESS';
export const GET_PRODUCT_SINGLE_FAIL = 'GET_PRODUCT_SINGLE_FAIL';

export function getSingleProductRequest(params) {
    return dispatch => {
        dispatch({
            type: GET_PRODUCT_SINGLE_REQUEST,
            payload: {params}
        })
    }
}
