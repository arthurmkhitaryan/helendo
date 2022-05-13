import Api from '../../Api';
import {
    GET_CATEGORY_FAIL,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
} from "../actions/categories";
import { call, put, takeLatest } from "redux-saga/effects";


export default function* watcher() {
    yield takeLatest(GET_CATEGORY_REQUEST, handleCategory);
};

function* handleCategory(action) {
    try {
        const { data } = yield call(Api.getCategoryList);
        yield put({
            type: GET_CATEGORY_SUCCESS,
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
            type: GET_CATEGORY_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}
