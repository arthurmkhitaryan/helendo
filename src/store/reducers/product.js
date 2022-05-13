import {
    GET_PRODUCT_FAIL,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_SINGLE_FAIL,
    GET_PRODUCT_SINGLE_REQUEST,
    GET_PRODUCT_SINGLE_SUCCESS,
} from '../actions/product';

const initialState = {
    productList: [],
    productListStatus: '',
    singleProduct: {},
    singleProductStatus: '',
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_REQUEST: {
            return {
                ...state,
                productListStatus: 'request',
            };
        }
        case GET_PRODUCT_SUCCESS: {
            return {
                ...state,
                productList: action.payload.data,
                productListStatus: 'success',
            };
        }
        case GET_PRODUCT_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                productListStatus: 'fail',
            };
        }
        case GET_PRODUCT_SINGLE_REQUEST: {
            return {
                ...state,
                singleProductStatus: 'request',
            };
        }
        case GET_PRODUCT_SINGLE_SUCCESS: {
            return {
                ...state,
                singleProduct: action.payload.data.product,
                singleProductStatus: 'success',
            };
        }
        case GET_PRODUCT_SINGLE_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                singleProductStatus: 'fail',
            };
        }
        default: {
            return state;
        }
    }
}
