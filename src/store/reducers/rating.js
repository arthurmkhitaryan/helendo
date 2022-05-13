import {
    SET_RATING_REQUEST,
    SET_RATING_SUCCESS,
    SET_RATING_FAIL
} from "../actions/rating";

const initialState = {
    data: {},
    setRatingStatus: '',
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_RATING_REQUEST: {
            return {
                ...state,
                setRatingStatus: 'request',
            };
        }
        case SET_RATING_SUCCESS: {
            return {
                ...state,
                data: action.payload.data,
                setRatingStatus: 'success',
            };
        }
        case SET_RATING_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                setRatingStatus: 'fail',
            };
        }
        default: {
            return state;
        }
    }
}
