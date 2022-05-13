export const SET_RATING_REQUEST = 'SET_RATING_REQUEST';
export const SET_RATING_SUCCESS = 'SET_RATING_SUCCESS';
export const SET_RATING_FAIL = 'SET_RATING_FAIL';

export function setRatingRequest(formData, cb) {
    return {
        type: SET_RATING_REQUEST,
        payload: {formData, cb}
    }
}
