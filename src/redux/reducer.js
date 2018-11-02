import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'

const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

function setLoginPending(isLoginPending){
    return{
        type: LOGIN_PENDING,
        isLoginPending
    };
}
function setLoginSuccess(isLoginSuccess){
    return{
        type: LOGIN_SUCCESS,
        isLoginSuccess
    };
}
function setLoginError(loginError){
    return{
        type: LOGIN_ERROR,
        loginError
    };
}

export function* loginSaga() {

}