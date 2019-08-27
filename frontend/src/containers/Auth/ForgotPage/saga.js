// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import BedderConfig from 'bedder/bedderConfig';
import request from 'utils/request';
import { SUBMIT_FORGOT, SUBMIT_CODE } from './constants';
import {
  submitForgotAction,
  submitForgotResultAction,
  submitForgotErrorAction,
  submitCodeResultAction,
  submitCodeErrorAction,
} from './actions';

import {
  makeSelectCode,
  makeSelectUsername,
  makeSelectPassword,
} from './selectors';

export function* makeCode() {
  const email = yield select(makeSelectUsername());
  const code = yield select(makeSelectCode());
  const password = yield select(makeSelectPassword());

  const requestURL = `${BedderConfig.getApiUrl()}/user/forgotPassword?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        code,
        password,
      }),
    });

    yield put(submitCodeResultAction(res));
  } catch (err) {
    yield put(submitCodeErrorAction(err));
  }
}

export function* makeForgot() {
  const email = yield select(makeSelectUsername());

  const requestURL = `${BedderConfig.getApiUrl()}/user/forgotPasswordRequest?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    yield put(submitForgotResultAction(res));
  } catch (err) {
    yield put(submitForgotErrorAction(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SUBMIT_FORGOT, makeForgot);
  yield takeLatest(SUBMIT_CODE, makeCode);
}
