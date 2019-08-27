// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import BedderConfig from 'bedder/bedderConfig';
import request from 'utils/request';
import { USER_SIGNUP, USER_ACTIVATE } from './constants';
import { SUBMITFACEBOOK } from './SignUpPropainer/constants';

import {
  userSignupErrorAction,
  userSignupSuccessAction,
  userActivateErrorAction,
  userActivateSuccessAction,
} from './actions';
import {
  changeFacebookResultAction,
  changeFacebookErrorAction,
} from './SignUpPropainer/actions';

import {
  makeSelectEmail,
  makeSelectCode,
  makeSelectError,
  makeSelectFirstname,
  makeSelectLastname,
  makeSelectPassword,
} from './selectors';
import { makeSelectFacebookOauthResult } from './SignUpPropainer/selectors';

export function* makeFacebook() {
  const facebookPayload = yield select(makeSelectFacebookOauthResult());

  const requestURL = `${BedderConfig.getApiUrl()}/user/registerFacebook?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        facebookPayload,
      }),
    });

    yield put(changeFacebookResultAction(res));
  } catch (err) {
    yield put(changeFacebookErrorAction(err));
  }
}

export function* makeActivation() {
  const code = yield select(makeSelectCode());
  const email = yield select(makeSelectEmail());

  const requestURL = `${BedderConfig.getApiUrl()}/user/activate?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    yield put(userActivateSuccessAction(res));
  } catch (err) {
    yield put(userActivateErrorAction(err));
  }
}

export function* makeSignUp() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const firstname = yield select(makeSelectFirstname());
  const lastname = yield select(makeSelectLastname());

  const requestURL = `${BedderConfig.getApiUrl()}/user/register`;
  // const requestURL = BedderConfig.prepareUrl('/user/register');

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
      }),
    });
    console.log("RES", res);
    yield put(userSignupSuccessAction(res));
  } catch (err) {
    yield put(userSignupErrorAction(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(USER_SIGNUP, makeSignUp);
  yield takeLatest(USER_ACTIVATE, makeActivation);
  yield takeLatest(SUBMITFACEBOOK, makeFacebook);
}
