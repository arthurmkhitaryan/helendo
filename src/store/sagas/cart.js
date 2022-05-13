import Api from '../../Api';
import {
    ADD_CART_FAIL,
    ADD_CART_REQUEST,
    ADD_CART_SUCCESS,
    DELETE_CART_FAIL,
    DELETE_CART_REQUEST,
    DELETE_CART_SUCCESS,
    GET_CART_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    UPDATE_CART_FAIL,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS
} from "../actions/cart";
import {call, put, takeLatest} from "redux-saga/effects";


export default function* watcher() {
    yield takeLatest(ADD_CART_REQUEST, handleAddCart);
    yield takeLatest(GET_CART_REQUEST, handleGetCart);
    yield takeLatest(UPDATE_CART_REQUEST, handleUpdateCart);
    yield takeLatest(DELETE_CART_REQUEST, handleDeleteCart);
};

function* handleAddCart(action) {
    try {
        const {formData} = action.payload;
        const {data} = yield call(Api.addCart, formData);
        yield put({
            type: ADD_CART_SUCCESS,
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
            type: ADD_CART_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}

function* handleGetCart() {
    try {
        const {data} = yield call(Api.getCart);
        yield put({
            type: GET_CART_SUCCESS,
            payload: {
                data,
            }
        })
    } catch (e) {
        console.warn(e)
        yield put({
            type: GET_CART_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}

function* handleUpdateCart(action) {
    try {
        const {formData} = action.payload;
        const {data} = yield call(Api.updateCart, formData);
        yield put({
            type: UPDATE_CART_SUCCESS,
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
            type: UPDATE_CART_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}

function* handleDeleteCart(action) {
    try {
        const {id} = action.payload;
        const {data} = yield call(Api.deleteCart, id);
        yield put({
            type: DELETE_CART_SUCCESS,
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
            type: DELETE_CART_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}
