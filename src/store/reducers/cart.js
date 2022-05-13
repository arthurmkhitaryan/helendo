import {
    ADD_CART_FAIL,
    ADD_CART_REQUEST,
    ADD_CART_SUCCESS,
    GET_CART_SUCCESS,
    GET_CART_REQUEST,
    GET_CART_FAIL,
    UPDATE_CART_SUCCESS,
    UPDATE_CART_REQUEST,
    UPDATE_CART_FAIL,
    DELETE_CART_SUCCESS,
    DELETE_CART_REQUEST,
    DELETE_CART_FAIL
} from '../actions/cart';


const initialState = {
    data: {},
    cartList: [],
    addCartStatus: '',
    getCartStatus: '',
    updateCartStatus: '',
    deleteCartStatus: '',
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CART_REQUEST: {
            return {
                ...state,
                addCartStatus: 'request',
            };
        }
        case ADD_CART_SUCCESS: {
            return {
                ...state,
                data: action.payload.data,
                addCartStatus: 'success',
            };
        }
        case ADD_CART_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                addCartStatus: 'fail',
            };
        }

        case GET_CART_REQUEST: {
            return {
                ...state,
                getCartStatus: 'request',
            };
        }
        case GET_CART_SUCCESS: {
            return {
                ...state,
                cartList: action.payload.data,
                getCartStatus: 'success',
            };
        }
        case GET_CART_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                getCartStatus: 'fail',
            };
        }
        case UPDATE_CART_REQUEST: {
            return {
                ...state,
                updateCartStatus: 'request',
            };
        }
        case UPDATE_CART_SUCCESS: {
            return {
                ...state,
                data: action.payload.data,
                updateCartStatus: 'success',
            };
        }
        case UPDATE_CART_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                updateCartStatus: 'fail',
            };
        }
        case DELETE_CART_REQUEST: {
            return {
                ...state,
                deleteCartStatus: 'request',
            };
        }
        case DELETE_CART_SUCCESS: {
            return {
                ...state,
                data: action.payload.data,
                deleteCartStatus: 'success',
            };
        }
        case DELETE_CART_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                deleteCartStatus: 'fail',
            };
        }
        default: {
            return state;
        }
    }
}
