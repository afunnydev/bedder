import { call, put, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';

import { SUBMIT } from './constants';
import { changeResultAction, changeErrorAction } from './actions';

import request from 'utils/request';

export function* makeSubmit() {
  const requestURL = BedderConfig.getApiUrl() + '/business/list?XDEBUG_SESSION_START=phpstorm';

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Bedder.getToken(),
      },
    });

    yield put(changeResultAction(res));
  } catch (err) {
    yield put(changeErrorAction(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SUBMIT, makeSubmit);
}
