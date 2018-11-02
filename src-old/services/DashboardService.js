import constants from "../constants";
import {
    take,
    call,
    put,
    fork,
    takeLatest
} from "redux-saga/effects";
import axios from "axios";
import * as types from './types';

const domain = constants.apiurl;

function fetchData(url) {
    return axios.get(url)
        .then(res => res)
        .catch(err => console.log('GET settings error: ', err))
}
function postData(url, data) {
    return axios.post(url, data)
        .then(res => res)
        .catch(err => console.log('GET settings error: ', err))
}
function putData(url, data) {
    return axios.put(url, data)
        .then(res => res)
        .catch(err => console.log('GET settings error: ', err))
}

function deleteData(url) {
    return axios.delete(url)
        .then(res => res)
        .catch(err => console.log('GET settings error: ', err))
}

// saga: makes the api call when saga sees the action
export function* listProjects() {
    let url = `${domain}/project/all`;
    try {
        const response = yield call(fetchData, url);
        if (response) {
            const data = response;
            yield put({
                type: types.API_CALL_SUCCESS,
                data
            });
        } else {
            yield put({
                type: types.API_CALL_FAILURE,
                error: 'error getting settings'
            });
        }
    } catch (error) {
        yield put({
            type: types.API_CALL_FAILURE,
            error
        });
    }
}

export function* createProject(body) {
    let url = `${domain}/project`;
    try {
        const response = yield call(postData, url, JSON.stringify(body));
        if (response) {
            const data = response;
            yield put({
                type: types.API_CALL_SUCCESS,
                data
            });
        } else {
            yield put({
                type: types.API_CALL_FAILURE,
                error: 'error getting settings'
            });
        }
    } catch (error) {
        yield put({
            type: types.API_CALL_FAILURE,
            error
        });
    }
}

export function* updateProject(id, body) {
    let url = `${domain}/project/${id}`;
    try {
        const response = yield call(putData, url, JSON.stringify(body));
        if (response) {
            const data = response;
            yield put({
                type: types.API_CALL_SUCCESS,
                data
            });
        } else {
            yield put({
                type: types.API_CALL_FAILURE,
                error: 'error getting settings'
            });
        }
    } catch (error) {
        yield put({
            type: types.API_CALL_FAILURE,
            error
        });
    }
}

export function* deleteProject(id) {
    let url = `${domain}/project/${id}`;
    try {
        const response = yield call(deleteData, url);
        if (response) {
            const data = response;
            yield put({
                type: types.API_CALL_SUCCESS,
                data
            });
        } else {
            yield put({
                type: types.API_CALL_FAILURE,
                error: 'error getting settings'
            });
        }
    } catch (error) {
        yield put({
            type: types.API_CALL_FAILURE,
            error
        });
    }
}