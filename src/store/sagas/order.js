import Api from '../../Api';
import {
    ADD_ORDER_FAIL,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SINGLE_FAIL,
    GET_ORDER_SINGLE_REQUEST,
    GET_ORDER_SINGLE_SUCCESS,
    GET_ORDER_SUCCESS
} from "../actions/order";
import {call, put, takeLatest} from "redux-saga/effects";


export default function* watcher() {
    yield takeLatest(ADD_ORDER_REQUEST, handleAddOrder);
    yield takeLatest(GET_ORDER_REQUEST, handleGetOrder);
    yield takeLatest(GET_ORDER_SINGLE_REQUEST, handleGetSingleOrder);
};

function* handleAddOrder(action) {
    console.log(8)
    try {
        const {data} = yield call(Api.addOrder);
        yield put({
            type: ADD_ORDER_SUCCESS,
            payload: {
                data,
            }
        })
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.warn(e)
        yield put({
            type: ADD_ORDER_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}

function* handleGetOrder() {
    try {
        const {data} = yield call(Api.getOrder);
        yield put({
            type: GET_ORDER_SUCCESS,
            payload: {
                data,
            }
        })
    } catch (e) {
        console.warn(e)
        yield put({
            type: GET_ORDER_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}

function* handleGetSingleOrder(action) {
    try {
        const {params} = action.payload
        const {data} = yield call(Api.getOrderSingle, params);
        console.log(data)
        yield put({
            type: GET_ORDER_SINGLE_SUCCESS,
            payload: {
                data,
            }
        })
    } catch (e) {
        console.warn(e)
        yield put({
            type: GET_ORDER_SINGLE_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}