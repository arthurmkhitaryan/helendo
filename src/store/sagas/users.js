import Api from '../../Api';
import {
    SENT_REGISTER_REQUEST,
    SENT_REGISTER_SUCCESS,
    SENT_REGISTER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL
} from "../actions/users";
import { call, put, takeLatest } from "redux-saga/effects";


export default function* watcher() {
    yield takeLatest(SENT_REGISTER_REQUEST, handleRegister);
    yield takeLatest(LOGIN_REQUEST, handleLogin);
    yield takeLatest(GET_USER_REQUEST, handleGetUser);
    yield takeLatest(UPDATE_USER_REQUEST, handleUpdateUser);
};

function* handleRegister(action) {
    try {
        const { formData } = action.payload;
        const { data } = yield call(Api.register, formData);
        yield put({
            type: SENT_REGISTER_SUCCESS,
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
            type: SENT_REGISTER_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}

function* handleLogin(action) {
    try {
        const { formData } = action.payload;
        const { data } = yield call(Api.login, formData);
        yield put({
            type: LOGIN_SUCCESS,
            payload: {
                data,
            }
        });
        if (action.payload.cb) {
            action.payload.cb(null, data);
        }
    } catch (e) {
        console.warn(e)
        yield put({
            type: LOGIN_FAIL,
            status: e.status,
            message: e.message,
        });
        if (action.payload.cb) {
            action.payload.cb(e, e.response?.data || {});
        }
    }
}


function* handleGetUser(action) {
    try {
        const { data } = yield call(Api.getUser);
        yield put({
            type: GET_USER_SUCCESS,
            payload: {
                data,
            }
        });

    } catch (e) {
        console.warn(e)
        yield put({
            type: GET_USER_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}


function* handleUpdateUser(action) {
    try {
        const { formData } = action.payload;
        const { data } = yield call(Api.updateUser, formData);
        yield put({
            type: UPDATE_USER_SUCCESS,
            payload: {
                data,
            }
        });

    } catch (e) {
        console.warn(e)
        yield put({
            type: UPDATE_USER_FAIL,
            status: e.status,
            message: e.message,
        });
    }
}
