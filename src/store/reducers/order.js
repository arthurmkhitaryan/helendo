import {
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    GET_ORDER_SINGLE_REQUEST,
    GET_ORDER_SINGLE_SUCCESS,
    GET_ORDER_SINGLE_FAIL
} from '../actions/order';


const initialState = {
    data: {},
    orderList: [],
    singleOrder: [],
    addOrderStatus: '',
    getOrderStatus: '',
    singleOrderStatus: '',
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ORDER_REQUEST: {
            return {
                ...state,
                addOrderStatus: 'request',
            };
        }
        case ADD_ORDER_SUCCESS: {
            return {
                ...state,
                data: action.payload.data,
                addOrderStatus: 'success',
            };
        }
        case ADD_ORDER_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                addOrderStatus: 'fail',
            };
        }
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                getOrderStatus: 'request',
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderList: action.payload.data,
                getOrderStatus: 'success',
            };
        }
        case GET_ORDER_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                getOrderStatus: 'fail',
            };
        }
        case GET_ORDER_SINGLE_REQUEST: {
            return {
                ...state,
                singleOrderStatus: 'request',
            };
        }
        case GET_ORDER_SINGLE_SUCCESS: {
            return {
                ...state,
                singleOrder: action.payload.data.order,
                singleOrderStatus: 'success',
            };
        }
        case GET_ORDER_SINGLE_FAIL: {
            return {
                ...state,
                status: action.status,
                message: action.message,
                singleOrderStatus: 'fail',
            };
        }
        default: {
            return state;
        }
    }
}
