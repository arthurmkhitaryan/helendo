export const ADD_WISHLIST_REQUEST = 'ADD_WISHLIST_REQUEST';
export const ADD_WISHLIST_SUCCESS = 'ADD_WISHLIST_SUCCESS';
export const ADD_WISHLIST_FAIL = 'ADD_WISHLIST_FAIL';

export function addWishlistRequest(formData, cb) {
    return {
        type: ADD_WISHLIST_REQUEST,
        payload: {formData, cb}
    }
}
export const GET_WISHLIST_REQUEST = 'GET_WISHLIST_REQUEST';
export const GET_WISHLIST_SUCCESS = 'GET_WISHLIST_SUCCESS';
export const GET_WISHLIST_FAIL = 'GET_WISHLIST_FAIL';

export function getWishlistRequest(data) {
    return {
        type: GET_WISHLIST_REQUEST,
        payload: {data}
    }
}


export const DELETE_WISHLIST_REQUEST = 'DELETE_WISHLIST_REQUEST';
export const DELETE_WISHLIST_SUCCESS = 'DELETE_WISHLIST_SUCCESS';
export const DELETE_WISHLIST_FAIL = 'DELETE_WISHLIST_FAIL';

export function deleteWishlistRequest(id, cb) {
    return {
        type: DELETE_WISHLIST_REQUEST,
        payload: {id, cb}
    }
}
