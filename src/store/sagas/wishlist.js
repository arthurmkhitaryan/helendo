import Api from '../../Api';
import {
    ADD_WISHLIST_FAIL,
    ADD_WISHLIST_REQUEST,
    ADD_WISHLIST_SUCCESS,
    DELETE_WISHLIST_FAIL,
    DELETE_WISHLIST_REQUEST,
    DELETE_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS
} from '../actions/wishlist';
import {call, put, takeLatest} from "redux-saga/effects";


export default function* watcher() {
    yield takeLatest(ADD_WISHLIST_REQUEST, handleAddWishlist);
    yield takeLatest(GET_WISHLIST_REQUEST, handleGetWishlist);
    yield takeLatest(DELETE_WISHLIST_REQUEST, handleDeleteWishlist);
};

function* handleAddWishlist(action) {
    try {
        const {formData} = action.payload;
        const {data} = yield call(Api.addWishlist, formData);
        yield put({
            type: ADD_WISHLIST_SUCCESS,
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
            type: ADD_WISHLIST_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}

function* handleGetWishlist() {
    try {
        const {data} = yield call(Api.getWishlist);
        yield put({
            type: GET_WISHLIST_SUCCESS,
            payload: {
                data,
            }
        })
    } catch (e) {
        console.warn(e)
        yield put({
            type: GET_WISHLIST_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}

function* handleDeleteWishlist(action) {
    try {
        const {id} = action.payload;
        const {data} = yield call(Api.deleteWishlist, id);
        yield put({
            type: DELETE_WISHLIST_SUCCESS,
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
            type: DELETE_WISHLIST_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}
