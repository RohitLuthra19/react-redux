const loginUrl = 'https://mk-api.herokuapp.com/resume'

export function handleApiErrors(response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}

function loginApi(email, password) {
  return fetch(`${loginUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {
      throw error
    })
}

function* loginFlow(email, password) {
  let token
  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    token = yield call(loginApi, email, password)

    // inform Redux to set our client token, this is non blocking so...
    yield put(setClient(token))

    // .. also inform redux that our login was successful
    yield put({
      type: LOGIN_SUCCESS
    })

    // set a stringified version of our token to localstorage on our domain
    localStorage.setItem('token', JSON.stringify(token))

    // redirect them to WIDGETS!
    browserHistory.push('/widgets')
  } catch (error) {
    // error? send it to redux
    yield put({
      type: LOGIN_ERROR,
      error
    })
  } finally {
    // No matter what, if our `forked` `task` was cancelled
    // we will then just redirect them to login
    if (yield cancelled()) {
      browserHistory.push('/login')
    }
  }

  // return the token for health and wealth
  return token
}

function registerApi(email, password) {
  return fetch(`${loginUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {
      throw error
    })
}

function* loginFlow(email, password) {
  let token
  try {
    token = yield call(registerApi, name, email, password)
    yield put(setClient(token))
    yield put({
      type: LOGIN_SUCCESS
    })
    localStorage.setItem('token', JSON.stringify(token))
    browserHistory.push('/widgets')
  } catch (error) {
    yield put({
      type: LOGIN_ERROR,
      error
    })
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/login')
    }
  }
  return token
}