import Api from '../../Api';
import {
    SET_RATING_REQUEST,
    SET_RATING_SUCCESS,
    SET_RATING_FAIL
} from "../actions/rating";
import { call, put, takeLatest } from "redux-saga/effects";


export default function* watcher() {
    yield takeLatest(SET_RATING_REQUEST, handleSetRating);
};

function* handleSetRating(action) {
    try {
        const { formData } = action.payload;
        const { data } = yield call(Api.setRating, formData);
        yield put({
            type: SET_RATING_SUCCESS,
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
            type: SET_RATING_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}
