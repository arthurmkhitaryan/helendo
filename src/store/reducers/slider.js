import {
    GET_BRAND_FAIL,
    GET_BRAND_REQUEST,
    GET_BRAND_SUCCESS,
    GET_CAROUSEL_FAIL,
    GET_CAROUSEL_REQUEST,
    GET_CAROUSEL_SUCCESS,
} from '../actions/slider';

const initialState = {
    sliderList: [],
    sliderListStatus: '',
    brandList: [],
    brandListStatus: '',
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CAROUSEL_REQUEST: {
            return {
                ...state,
                dataStatus: 'request',
            };
        }
        case GET_CAROUSEL_SUCCESS: {
            return {
                ...state,
                sliderList: action.payload.data.list,
                dataStatus: 'success',
            };
        }
        case GET_CAROUSEL_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                dataStatus: 'fail',
            };
        }
        case GET_BRAND_REQUEST: {
            return {
                ...state,
                brandListStatus: 'request',
            };
        }
        case GET_BRAND_SUCCESS: {
            return {
                ...state,
                brandList: action.payload.data.list,
                brandListStatus: 'success',
            };
        }
        case GET_BRAND_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                brandListStatus: 'fail',
            };
        }
        default: {
            return state;
        }
    }
}
