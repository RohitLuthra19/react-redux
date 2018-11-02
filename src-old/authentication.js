import decode from 'jwt-decode';
import axios from 'axios';

import constants from "./constants";

const domain = constants.apiurl;

const loggedIn = () => {
    const token = getToken()
    return !!token && !isTokenExpired(token)
}

const isTokenExpired = (token) => {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            return true;
        } else
            return false;
    } catch (err) {
        return false;
    }
}

const getToken = () => {
    return localStorage.getItem('id_token')
}

const setToken = (idToken) => {
    localStorage.setItem('id_token', idToken);
}

const _checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        console.log(response);
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

const _fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    // Setting Authorization header
    if (loggedIn()) {
        headers['Authorization'] = getToken()
    }

    return fetch(url, {
            headers,
            ...options
        })
        .then(_checkStatus)
        .then(response => response.json())
}

const authMock = (login, password) =>
  new Promise((resolve, reject) => {
    if (login === 'root' && password === 'root') {
      resolve({ token: 'secret-token' });
    } else {
      reject({ status: 401 });
    }
  });

function* login({ payload: user }) {
  try {
    const { token } = yield call(authMock, user);
    yield put({ type: AUTH_SUCCESS, payload: token });
    localStorage.setItem('token', token);
  } catch (error) {
    let message;
    switch (error.status) {
      case 500: message = 'Internal Server Error'; break;
      case 401: message = 'Invalid credentials'; break;
      default: message = 'Something went wrong';
    }
    yield put({ type: AUTH_FAILURE, payload: message });
    localStorage.removeItem('token');
  }
}
export const register = (user, history) => dispatch => {
    let url = `${domain}/auth/register`;
    axios.post(url, JSON.stringify(user))
        .then(res => history.push('/login'))
        .catch(err => {
            console.log(err);
        });
}



export const logout = (history) => dispatch => {
    localStorage.removeItem('id_token');
    dispatch(setCurrentUser({}));
    history.push('/login');
}