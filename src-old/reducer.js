import { combineReducers } from 'redux';

import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from './actions';

export const authorize = (login, password) => ({
  type: AUTH_REQUEST,
  payload: { login, password }
});

const initialState = {
  token: localStorage.getItem('token'),
  error: null
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS: {
      return { ...state, token: payload };
    }
    case AUTH_FAILURE: {
      return { ...state, error: payload };
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  auth: authReducer
});

export default reducer;