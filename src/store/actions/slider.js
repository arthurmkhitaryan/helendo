// export const SENT_REGISTER_REQUEST = 'SENT_REGISTER_REQUEST';
// export const SENT_REGISTER_SUCCESS = 'SENT_REGISTER_SUCCESS';
// export const SENT_REGISTER_FAIL = 'SENT_REGISTER_FAIL';
//
// export function sentRegisterRequest(formData, cb) {
//     return {
//         type: SENT_REGISTER_REQUEST,
//         payload: {
//             formData, cb
//         }
//     }
// }
//
// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAIL = 'LOGIN_FAIL';
//
// export function loginRequest(formData, cb) {
//     return {
//         type: LOGIN_REQUEST,
//         payload: {
//             formData, cb
//         }
//     }
// }

export const GET_CAROUSEL_REQUEST = 'GET_CAROUSEL_REQUEST';
export const GET_CAROUSEL_SUCCESS = 'GET_CAROUSEL_SUCCESS';
export const GET_CAROUSEL_FAIL = 'GET_CAROUSEL_FAIL';

export function getCarouselListRequest(params) {
    return {
        type: GET_CAROUSEL_REQUEST,
        payload: {params}
    }
}

export const GET_BRAND_REQUEST = 'GET_BRAND_REQUEST';
export const GET_BRAND_SUCCESS = 'GET_BRAND_SUCCESS';
export const GET_BRAND_FAIL = 'GET_BRAND_FAIL';

export function getBrandListRequest(params) {
    return {
        type: GET_BRAND_REQUEST,
        payload: {params}
    }
}
