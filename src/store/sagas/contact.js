import Api from '../../Api';
import {
    CONTACT_FAIL,
    CONTACT_REQUEST,
    CONTACT_SUCCESS,
} from '../actions/contact';
import { call, put, takeLatest } from "redux-saga/effects";


export default function* watcher() {
    yield takeLatest(CONTACT_REQUEST, handleContact);
};

function* handleContact(action) {
    try {
        const { formData } = action.payload;
        const { data } = yield call(Api.sendMessage, formData);
        yield put({
            type: CONTACT_SUCCESS,
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
            type: CONTACT_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}
